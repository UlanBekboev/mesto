const profileEditButton = document.querySelector('.profile__edit-button_action_open');
const cardListSelector = '.elements';
const profileForm = document.forms["profile-form"];
const placeForm = document.forms["place-form"];
const avatarForm = document.forms["avatar-form"];
const addPlacePopupSelector = '.popup_type_place';
const photoPopupSelector = '.popup_type_photo';
const profileEditPopupSelector = '.popup_type_edit';
const popupTypeConfirmSelector = '.popup_type_confirm';
const profileAddPlaceButton = document.querySelector(".profile__add-button_action_add");
const avatar = document.querySelector('.profile__avatar');
const avatarButton = document.querySelector('.profile__avatar-btn');

const config = {
  submitSelector: '.form__submit-button',
  inputSelector: '.form__input',
  inputSectionSelector: '.form__set',
  inputErrorSelector: '.form__input-error',
  inputErrorClass: 'form__input-error_active',
  formInputTypeError: 'form__input_type_error',
  disabledButtonClass: 'form__submit-button_inactive',
  formSelector: 'form',
};

export { 
  profileEditButton, 
  cardListSelector,
  profileForm,
  placeForm,
  avatarForm,
  addPlacePopupSelector,
  photoPopupSelector,
  profileEditPopupSelector,
  profileAddPlaceButton,
  config,
  avatar,
  avatarButton,
  popupTypeConfirmSelector
};