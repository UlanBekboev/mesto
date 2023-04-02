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
const forms = document.querySelectorAll('.form');

const validationOptions = {
  submitSelector: '.form__submit-button',
  inputSelector: '.form__input',
  inputSectionSelector: '.form__set',
  inputErrorSelector: '.form__input-error',
  inputErrorClass: 'form__input-error_active',
  formInputTypeError: 'form__input_type_error',
  disabledButtonClass: 'form__submit-button_inactive',
};

const createCards = (data) => {
  const card = new Card(data, '#card-template');
  const cardElement = card.renderCard();

  return cardElement;
}

initialCards.forEach((data) => {
  container.append(createCards(data));
});

forms.forEach((form) => {
  const formValidator = new FormValidator(validationOptions, form);
  formValidator.enableValidation();
});
 
function openProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  const submitButton = profilePopup.querySelector('.form__submit-button');
  submitButton.classList.remove('form__submit-button_inactive');
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
  const data = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };
  container.prepend(createCards(data, '#card-template'));
  evt.target.reset();
  closePopup(addPlacePopup);

}
placeForm.addEventListener("submit", handlePlaceFormSubmit);


  


  



