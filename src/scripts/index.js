import {profileEditButton, cardListSelector, profileForm, placeForm, addPlacePopupSelector, photoPopupSelector, 
  profileEditPopupSelector, nameInput, jobInput, profileAddPlaceButton, validationOptions, initialCards} from "./utils/constants.js";
import Section from "./components/Section.js"
import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__text',
});

 const createCards = (item) => {
  const card = new Card(item, '#card-template', {
    handleCardClick: (item) => {
    const popupWithImage = new PopupWithImage(photoPopupSelector);   
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

const validators = {};

const createFormValidator = (form) => {
const validator = new FormValidator(validationOptions, form);
validator.enableValidation();
validators[form.getAttribute('name')] = validator;
}

createFormValidator(profileForm);
createFormValidator(placeForm);

const editProfilePopup = new PopupWithForm(profileEditPopupSelector, {handleFormSubmit:
  (dataForm) => {
    userInfo.setUserInfo(dataForm);
    console.log(dataForm);
    editProfilePopup.closePopup();
  }})
  editProfilePopup.setEventListeners();

  function fillInEditProfileFormInputs({ username, job }) {
    nameInput.value = username;
    jobInput.value = job;
  }

  profileEditButton.addEventListener('click', () => {
    validators[profileForm.getAttribute('name')].enableButton();
    validators[profileForm.getAttribute('name')].hideAllInputError();
    const info = userInfo.getUserInfo();
    fillInEditProfileFormInputs({ 
      username: info.name, 
      job: info.job 
    });
    editProfilePopup.openPopup();
  });

  const addPlacePopup = new PopupWithForm(addPlacePopupSelector, {handleFormSubmit:
    (data) => {
      const newCard = new Section(
        {
          items: data,
          renderer: (elem) => {
            const card = createCards(elem);
            newCard.addItem(card);
          }
        },
        cardListSelector
      );
      return newCard.renderItems();
    }
  });
    
  addPlacePopup.setEventListeners();

  profileAddPlaceButton.addEventListener('click', () => {
    addPlacePopup.openPopup();
  });

