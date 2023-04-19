const profileEditButton = document.querySelector('.profile__edit-button_action_open');
const cardListSelector = '.elements';
const profileForm = document.forms["profile-form"];
const placeForm = document.forms["place-form"];
const addPlacePopupSelector = '.popup_type_place';
const photoPopupSelector = '.popup_type_photo';
const profileEditPopupSelector = '.popup_type_edit';
const profileEditPopup = document.querySelector("popup_type_edit");
const nameInput = profileEditPopup.querySelector(".form__input_el_heading");
const jobInput = profileEditPopup.querySelector(".form__input_el_subheading");
const profileAddPlaceButton = document.querySelector(".profile__add-button_action_add");

const validationOptions = {
  submitSelector: '.form__submit-button',
  inputSelector: '.form__input',
  inputSectionSelector: '.form__set',
  inputErrorSelector: '.form__input-error',
  inputErrorClass: 'form__input-error_active',
  formInputTypeError: 'form__input_type_error',
  disabledButtonClass: 'form__submit-button_inactive',
};

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

export { 
  profileEditButton, 
  cardListSelector,
  profileForm,
  placeForm,
  addPlacePopupSelector,
  photoPopupSelector,
  profileEditPopupSelector,
  nameInput,
  jobInput,
  profileAddPlaceButton,
  validationOptions,
  initialCards
};