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
  cardImagePopup.alt = cardImage.alt;
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


function openProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
  const submitElement = profileForm.querySelector(validationOptions.submitSelector);
	const inputs = Array.from(profileForm.querySelectorAll(validationOptions.inputSelector));
  toggleButtonState(inputs, submitElement, validationOptions.disabledButtonClass);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeErrors(popup);
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
    document.removeEventListener('keydown', closeByEsc);
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
      popup.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
          closePopup(popup);
        }; 
      }); 
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
const placeForm = addPlacePopup.querySelector('.form');
const placeNameInput = addPlacePopup.querySelector('.form__input_el_heading');
const placeLinkInput = addPlacePopup.querySelector('.form__input_el_subheading');

profileAddPlaceButton.addEventListener("click", () => {
  openPopup(addPlacePopup);
  const form = addPlacePopup.querySelector('.form');
  form.reset();
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

const removeErrors = (popup) => {
  const inputs = Array.from(popup.querySelectorAll(validationOptions.inputSelector));
	inputs.forEach((inputElement) => {
  const { inputSectionSelector, inputErrorClass, formInputTypeError } = validationOptions;
	const inputSectionElement = inputElement.closest(inputSectionSelector);
  const errorElement = inputSectionElement.querySelector(`.${inputElement.id}-error`); 
	hideInputError(errorElement, inputErrorClass, inputElement, formInputTypeError);
  });
}




  



