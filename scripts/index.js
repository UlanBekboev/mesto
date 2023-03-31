const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

import FormValidator from './FormValidator.js';
import Card from './Card.js';

const profileEditButton = document.querySelector('.profile__edit-button_action_open');
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__text");
const profilePopup = document.querySelector(".popup_type_edit");
const nameInput = profilePopup.querySelector(".form__input_el_heading");
const jobInput = profilePopup.querySelector(".form__input_el_subheading");
const profileForm = document.forms["profile-form"];
const placeForm = document.forms["place-form"];
const container = document.querySelector('.elements');
const inputs = document.querySelectorAll('.form__input');
const profileInput = profileForm.querySelector('.form__input');

const validationOptions = {
  formSelector: '.form',
  submitSelector: '.form__submit-button',
  inputSelector: '.form__input',
  inputSectionSelector: '.form__set',
  inputErrorSelector: '.form__input-error',
  inputErrorClass: 'form__input-error_active',
  formInputTypeError: 'form__input_type_error',
  disabledButtonClass: 'form__submit-button_inactive',
};

initialCards.forEach((data) => {
  const card = new Card(data, '#card-template');
  const cardElement = card.renderCard(data.name, data.link);
  container.prepend(cardElement);
});

inputs.forEach((input) => {
  const formValidator = new FormValidator(validationOptions, input);
  formValidator.enableValidation();
});

const formValidator = new FormValidator(validationOptions, profileInput);
const card = new Card(initialCards, '#card-template');
  
function openProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formValidator.toggleButtonState();
  openPopup(profilePopup);
}

export default function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened'); 
  document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      } 
    });
  });

profileEditButton.addEventListener('click', openProfileForm);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

const profileAddPlaceButton = document.querySelector(".profile__add-button_action_add");
const addPlacePopup = document.querySelector('.popup_type_place');
const placeNameInput = addPlacePopup.querySelector('.form__input_el_heading');
const placeLinkInput = addPlacePopup.querySelector('.form__input_el_subheading');

profileAddPlaceButton.addEventListener("click", () => {
  openPopup(addPlacePopup);
});

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;
  const cardElement = card.renderCard(placeName, placeLink);
  document.querySelector('.elements').prepend(cardElement);
  evt.target.reset();
  closePopup(addPlacePopup);

}
placeForm.addEventListener("submit", handlePlaceFormSubmit);


  


  



