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

function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardImages = document.querySelectorAll(".element__image");
  const cardTitle = cardElement.querySelector('.element__title');
  const deleteButton = cardElement.querySelectorAll(".element__trash");
  const likeButton = cardElement.querySelectorAll(".element__like");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = `Картина: местность ${name}`;

  cardImages.forEach((image) => {
    image.addEventListener("click", openPhoto);
  });

  deleteButton.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.target.closest(".element").remove();
    });
  });

  likeButton.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.target.classList.toggle("element__like_active");
    });
  }); 

  return cardElement;
}

function renderCard(name, link) {
  const card = createCard(name, link);
  container.prepend(card);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link);
});


const profileEditButton = document.querySelector('.profile__edit-button_action_open');
const imagePopup = document.querySelectorAll(".popup__image");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__text");
const popup = document.querySelector(".popup");
const profilePopup = document.querySelector(".popup_type_edit");
const nameInput = popup.querySelector(".form__item_el_heading");
const jobInput = popup.querySelector(".form__item_el_subheading");
const profileForm = profilePopup.querySelector(".form");

function addForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup(popup);
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

profileEditButton.addEventListener("click", addForm);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popup);
}
profileForm.addEventListener("submit", handleFormSubmit);
  
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
  const currentPopup = button.closest('.popup');
  button.addEventListener('click', () => togglePopup(currentPopup));
});

const profileAddButton = document.querySelector(".profile__add-button_action_add");
const addPlacePopup = document.querySelector('.popup_type_place');
const placeForm = addPlacePopup.querySelector('.form');
const placeNameInput = addPlacePopup.querySelector('.form__item_el_heading');
const placeLinkInput = addPlacePopup.querySelector('.form__item_el_subheading');

profileAddButton.addEventListener("click", () => togglePopup(addPlacePopup));

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;
  renderCard(placeName, placeLink);

  evt.target.reset();
  togglePopup(addPlacePopup);
}
placeForm.addEventListener("submit", handlePlaceFormSubmit);

const photoPopup = document.querySelector('.popup_type_photo');
const elementImages = document.querySelectorAll(".element__image");
const elementTitles = document.querySelectorAll(".element__title");

function openPhoto(e) {
  const cardImage = photoPopup.querySelector('.popup__image');
  const cardTitle = photoPopup.querySelector('.popup__caption');
  elementImages.forEach((elem) => {
    elem = e.target;
    cardImage.src = elem.src;
  });

  elementTitles.forEach((title) => {
    title = e.target;
    cardTitle.textContent = title.textContent;
  });

  togglePopup(photoPopup);
} 




