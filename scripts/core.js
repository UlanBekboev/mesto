const profileOpenButton = document.querySelector(".profile__edit-button_action_open");
const Name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__text");
const popup = document.querySelector(".popup");
const popupAddform = document.querySelector(".popup_type_edit");
const popupCloseButton = popup.querySelector(".popup__close");
const form = popup.querySelector(".form");
const nameInput = popup.querySelector(".form__item_el_heading");
const jobInput = popup.querySelector(".form__item_el_subheading");

const popupAddFormToggle = () => {
  popupAddform.classList.toggle("popup_opened");
}

function addForm() {
  profileOpenButton.addEventListener("click", popupAddFormToggle);
  nameInput.value = Name.textContent;
  jobInput.value = job.textContent;
  popupCloseButton.addEventListener("click", popupAddFormToggle);
}
addForm();

function formSubmitHandler(evt) {
  evt.preventDefault();
  Name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupAddform.classList.remove("popup_opened");
}
form.addEventListener("submit", formSubmitHandler);

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

const profileAddButton = document.querySelector(".profile__add-button_action_add");
const addPlacePopup = document.querySelector('.popup_type_place');
const container = document.querySelector('.elements');
const placeForm = addPlacePopup.querySelector('.form');
const popupAddPlaceClose = addPlacePopup.querySelector('.popup__close');

const popupAddPlaceToggle = () => {
  addPlacePopup.classList.toggle("popup_opened");
}  

profileAddButton.addEventListener("click", popupAddPlaceToggle);
popupAddPlaceClose.addEventListener("click", popupAddPlaceToggle);

  
function createCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = `Картина: местность ${name}`;
  
  return cardElement;
}

function renderCard(name, link) {
  const card = createCard(name, link);
  container.prepend(card);
  addPlacePopup.querySelector(".form__item_el_heading").value ='';
  addPlacePopup.querySelector(".form__item_el_subheading").value ='';
  deleteCard();
  likeCard();
  /*
  if (container.children.length >= 6) {
     container.lastElementChild.remove();
  } */

  const imagePopup = document.querySelectorAll(".popup__image");
imagePopup.forEach((image) => {
  image.addEventListener("click", openPhoto);
});
}


function HandlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const name = placeForm.querySelector('.form__item_el_heading').value;
  const link = placeForm.querySelector('.form__item_el_subheading').value;
  renderCard(name, link);

addPlacePopup.classList.remove("popup_opened");
}
placeForm.addEventListener("submit", HandlePlaceFormSubmit);

function deleteCard() {
  deleteButton = document.querySelectorAll(".element__trash");
  deleteButton.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.target.closest(".element").remove();
    });
  });
}
deleteCard();

function likeCard() {
  const likeButton = document.querySelectorAll(".element__like");
  likeButton.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.target.classList.toggle("element__like_active");
    });
  });
}
likeCard();
  

const photoPopup = document.querySelector('.popup_type_photo');

function openPhoto(e) {
  photoPopup.classList.add('popup_opened');
  const cardImage = photoPopup.querySelector('.popup__image');
  const cardTitle = photoPopup.querySelector('.popup__caption');
  const elementImage = document.querySelectorAll(".element__image");
  const clickedImage = e.target;
  const index = Array.from(elementImage).indexOf(clickedImage);
  cardImage.src = elementImage[index].src;
  const elementTitle = document.querySelectorAll(".element__title");
  cardTitle.textContent = elementTitle[index].textContent;

  const popupClose = photoPopup.querySelector('.popup__close');  
  popupClose.addEventListener('click', popupOpenPhotoToggle);
}

const popupOpenPhotoToggle = () => {
  photoPopup.classList.toggle("popup_opened");
}  

const imageElements = document.querySelectorAll(".element__image");
imageElements.forEach((image) => {
  image.addEventListener("click", openPhoto);
});

const imagePopup = document.querySelectorAll(".popup__image");
imagePopup.forEach((image) => {
  image.addEventListener("click", openPhoto);
});