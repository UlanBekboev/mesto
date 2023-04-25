import './index.css';
import {profileEditButton, cardListSelector, profileForm, placeForm, addPlacePopupSelector, photoPopupSelector, 
  profileEditPopupSelector, profileAddPlaceButton, config, initialCards} from "../scripts/utils/constants.js";
import Section from "../scripts/components/Section.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__text',
});

const popupWithImage = new PopupWithImage(photoPopupSelector); 
popupWithImage.setEventListeners();

 const createCards = (item) => {
  const card = new Card(item, '#card-template', {
    handleCardClick: (item) => {  
    popupWithImage.openPopup(item);
  }});
    const cardElement = card.renderCard();

  return cardElement;
}

const cards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCards(item);
      cards.addItem(card);
    }
  },
  cardListSelector
);

cards.renderItems();

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
    userInfo.setUserInfo(dataForm);
  }})
  editProfilePopup.setEventListeners();

  profileEditButton.addEventListener('click', () => {
    formValidators[profileForm.getAttribute('name')].resetValidation();
    const info = userInfo.getUserInfo();
    editProfilePopup.setInputValues(info);
    editProfilePopup.openPopup();
  });

  const addPlacePopup = new PopupWithForm(addPlacePopupSelector, {handleFormSubmit:
    (data) => {  
       const card = createCards(data);
       cards.prependItem(card);
    }
  });
    
  addPlacePopup.setEventListeners();

  profileAddPlaceButton.addEventListener('click', () => {
    addPlacePopup.openPopup();
    formValidators[placeForm.getAttribute('name')].resetValidation();
  });
