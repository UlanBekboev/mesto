import './index.css';
import {profileEditButton, cardListSelector, profileForm, placeForm, avatarForm, addPlacePopupSelector, photoPopupSelector, 
  profileEditPopupSelector, profileAddPlaceButton, config, avatar, avatarButton,
  avatarPopupSelector, popupTypeConfirmSelector} from "../scripts/utils/constants.js";
import Section from "../scripts/components/Section.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
import Api from "../scripts/components/Api.js";

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__text',
  avatarSelector: '.profile__avatar'
});

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '00e2868b-7742-4cf0-bdf1-4d0becf10dbd',
    'Content-Type': 'application/json'
  }
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cards.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

const popupWithImage = new PopupWithImage(photoPopupSelector); 
popupWithImage.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation(popupTypeConfirmSelector);
deleteCardPopup.setEventListeners();

const createCards = (item) => {
  const card = new Card(
    item, 
    '#card-template', {
    handleCardClick: (item) => {  
      popupWithImage.openPopup(item);
    },
    userId: userId,
    handleDeleteIconClick: (cardId) => {
      deleteCardPopup.openPopup();
      deleteCardPopup.submitCallback(() => {
        deleteCardPopup.renderLoading(true)
        api.handleDeleteCard(cardId)
        .then(() => {
          deleteCardPopup.closePopup();
          card.handleDeleteCard();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          editProfilePopup.renderLoading(false);
        });
      })
    },
    handleSetLike: (cardId) => {
      api.handleLikeCard(cardId)
      .then((data) => {
        card.handleLikeCard(data)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    },
    handleRemoveLike: (cardId) => {
      api.handleDeleteLike(cardId) 
      .then((data) => {
        card.handleLikeCard(data)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }
  });
    const cardElement = card.renderCard();

  return cardElement;
}

const cards = new Section(
  {
    renderer: (item) => {
      const card = createCards(item);
      cards.addItem(card);
    }
  },
  cardListSelector
);

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

const editProfilePopup = new PopupWithForm(profileEditPopupSelector, {handleFormSubmit:
  (dataForm) => {
    editProfilePopup.renderLoading(true);
    api.editUserInfo(dataForm)
    .then((dataForm) => {
      userInfo.setUserInfo(dataForm);
      editProfilePopup.closePopup();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
  }});
  editProfilePopup.setEventListeners();

profileEditButton.addEventListener('click', () => {
  formValidators[profileForm.getAttribute('name')].resetValidation();
  const info = userInfo.getUserInfo();
  editProfilePopup.setInputValues(info);
  editProfilePopup.openPopup();
});

const addPlacePopup = new PopupWithForm(addPlacePopupSelector, {handleFormSubmit:
  (data) => {  
    addPlacePopup.renderLoading(true);
    api.addCard(data)
    .then((data) => {
      const card = createCards(data);
      cards.prependItem(card);
      addPlacePopup.closePopup();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      addPlacePopup.renderLoading(false);
    });
  }
});
    
addPlacePopup.setEventListeners();

profileAddPlaceButton.addEventListener('click', () => {
  addPlacePopup.openPopup();
  formValidators[placeForm.getAttribute('name')].resetValidation();
});
    
  const editAvatarPopup = new PopupWithForm(avatarPopupSelector, {handleFormSubmit:
    (data) => {  
      editAvatarPopup.renderLoading(true);
      api.editAvatar(data)
      .then((data) => {
        avatar.src = data.avatar;
        editAvatarPopup.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editAvatarPopup.renderLoading(false);
      });
    }
  });
      
editAvatarPopup.setEventListeners();

avatarButton.addEventListener('click', () => {
  formValidators[avatarForm.getAttribute('name')].resetValidation();
  editAvatarPopup.openPopup();
});