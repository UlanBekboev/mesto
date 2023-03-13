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

const cardTemplate = document.querySelector('#card-template').content;
const container = document.querySelector('.elements');
const cardImagePopup = document.querySelector(".popup__image");
const cardTitlePopup = document.querySelector(".popup__caption");
const photoPopup = document.querySelector('.popup_type_photo');

function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  const deleteButton = cardElement.querySelector(".element__trash");
  const likeButton = cardElement.querySelector(".element__like");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = `Картина: местность ${name}`;

  
  cardImage.addEventListener("click", openPhoto);
  
  deleteButton.addEventListener("click", (e) => {
    e.target.closest(".element").remove();
    });
  
  likeButton.addEventListener("click", (e) => {
      e.target.classList.toggle("element__like_active");
    }); 

  return cardElement;
}

function openPhoto(e) {
  const cardImage = e.target;
  const cardTitle = cardImage.closest(".element").querySelector(".element__title");
  cardImagePopup.src = cardImage.src;
  cardImage.alt = `Картина: местность ${cardTitle.textContent}`;
  cardTitlePopup.textContent = cardTitle.textContent;
  openPopup(photoPopup);
}

function renderCard(name, link) {
  const card = createCard(name, link);
  container.prepend(card);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link);
});


const profileEditButton = document.querySelector('.profile__edit-button_action_open');
const imagePopup = document.querySelector(".popup__image");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__text");
const profilePopup = document.querySelector(".popup_type_edit");
const nameInput = profilePopup.querySelector(".form__input_el_heading");
const jobInput = profilePopup.querySelector(".form__input_el_subheading");
const profileForm = profilePopup.querySelector(".form");


function addForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
  enableValidation(validationOptions);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  const inputs = Array.from(document.querySelectorAll(validationOptions.inputSelector));
	inputs.forEach((inputElement) => {
  const { inputSectionSelector, inputErrorClass } = validationOptions;
	const inputSectionElement = inputElement.closest(inputSectionSelector);
  const errorElement = inputSectionElement.querySelector(`.${inputElement.id}-error`); 
	hideInputError(errorElement, inputErrorClass, inputElement);
  });
}

profileEditButton.addEventListener('click', addForm);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}
profileForm.addEventListener("submit", handleFormSubmit);
  
const closeButtons = document.querySelectorAll('.popup__close');
  closeButtons.forEach((button) => {
  const currentPopup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(currentPopup);
  });
});


const profileAddButton = document.querySelector(".profile__add-button_action_add");
const addPlacePopup = document.querySelector('.popup_type_place');
const placeForm = addPlacePopup.querySelector('.form');
const placeNameInput = addPlacePopup.querySelector('.form__input_el_heading');
const placeLinkInput = addPlacePopup.querySelector('.form__input_el_subheading');

profileAddButton.addEventListener("click", () => {
  openPopup(addPlacePopup);
  const inputs = Array.from(document.querySelectorAll(validationOptions.inputSelector));
	inputs.forEach((inputElement) => {
  const { inputSectionSelector, inputErrorClass } = validationOptions;
	const inputSectionElement = inputElement.closest(inputSectionSelector);
  const errorElement = inputSectionElement.querySelector(`.${inputElement.id}-error`); 
	showInputError(errorElement, inputElement.validationMessage, inputErrorClass, inputElement);
  });
  enableValidation(validationOptions);
	});


function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;
  renderCard(placeName, placeLink);
  evt.target.reset();
  closePopup(addPlacePopup);
}
placeForm.addEventListener("submit", handlePlaceFormSubmit);


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

enableValidation(validationOptions);

const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popup);
      };
    });
  });
    
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};
  
document.addEventListener('keydown', closeByEsc);


