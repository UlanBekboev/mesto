const profileOpenButton = document.querySelector(
  ".profile__edit-button_action_open"
);
const profileAddButton = document.querySelector(
  ".profile__add-button_action_add"
);
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close");
const Name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__text");

function addForm() {
  const popupTemplate = document.querySelector("#popup-template").content;
  const popupElement = popupTemplate
    .querySelector(".popup__container")
    .cloneNode(true);
  popupElement.querySelector(".form__item_el_heading").value = Name.textContent;
  popupElement.querySelector(".form__item_el_subheading").value =
    job.textContent;
  popupElement
    .querySelector(".form")
    .addEventListener("submit", function (evt) {
      evt.preventDefault();
      Name.textContent = popupElement.querySelector(
        ".form__item_el_heading"
      ).value;
      job.textContent = popupElement.querySelector(
        ".form__item_el_subheading"
      ).value;
      popup.classList.remove("popup_opened");
      popupElement.remove();
    });
  popupElement
    .querySelector(".popup__close")
    .addEventListener("click", function () {
      popup.classList.remove("popup_opened");
      popupElement.remove();
    });
  popup.append(popupElement);
}

let openAddFormPopup = function (event) {
  popup.classList.add("popup_opened");
  addForm();
};

profileOpenButton.addEventListener("click", openAddFormPopup);

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

const container = document.querySelector(".elements");

function addPlace() {
  const cardTemplate = document.querySelector("#popup-template").content;
  let cardElement = cardTemplate
    .querySelector(".popup__container")
    .cloneNode(true);
  cardElement.querySelector(".form__heading").textContent = "Новое место";
  cardElement.querySelector(".form__item_el_heading").placeholder = "Название";
  cardElement.querySelector(".form__item_el_subheading").placeholder = "Ссылка на картинку";
  cardElement.querySelector(".form__submit-button").textContent = "Создать";

  cardElement.querySelector(".form").addEventListener("submit", function (evt) {
    evt.preventDefault();
    initialCards.forEach((elem) => {
      let nameInput = cardElement.querySelector(".form__item_el_heading");
      let linkInput = cardElement.querySelector(".form__item_el_subheading");
      const newCard = document.querySelector(".element").cloneNode(true);
      if (nameInput.value === elem.name && linkInput.value === elem.link) {
        newCard.querySelector(".element__title").textContent = elem.name;
        newCard.querySelector(".element__image").src = elem.link;
        newCard.querySelector(".element__image").alt = `Картина: местность ${elem.name}`;
        container.prepend(newCard);
        deleteCard();
        likeCard();
        nameInput.value = "";
        linkInput.value = "";
        popup.classList.remove("popup_opened");
        cardElement.remove();
        if (container.children.length >= 6) {
          return container.lastElementChild.remove();
        } 
      }
    });
    const newCardImages = document.querySelectorAll(".element__image");
    newCardImages.forEach((image) => {
      image.addEventListener("click", openPhoto);
    });
  });

  cardElement.querySelector(".popup__close").addEventListener("click", () => {
    popup.classList.remove("popup_opened");
    cardElement.remove();
  });

  popup.append(cardElement);
}


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

const openAddPlacePopup = (event) => {
  popup.classList.add("popup_opened");
  addPlace();
  likeCard();
}

profileAddButton.addEventListener("click", openAddPlacePopup);

function openPhoto(e) {
  const photoTemplate = document.querySelector("#popup-template").content;
  const photoElement = photoTemplate.querySelector(".popup__container").cloneNode(false);
  photoElement.classList.remove("popup__container");
  photoElement.classList.add("popup__image-container");

  const caption = document.createElement("figcaption");
  caption.classList.add("popup__figcaption");

  const popupImage = document.querySelectorAll(".element__image");
  const clickedImage = e.target;
  const index = Array.from(popupImage).indexOf(clickedImage);
  const elementTitle = document.querySelectorAll(".element__title");
  caption.textContent = elementTitle[index].textContent;
  photoElement.style.backgroundImage = `url(${clickedImage.src})`;

  photoElement.style.backgroundPosition = "center";
  photoElement.style.backgroundRepeat = "no-repeat";
  photoElement.style.backgroundSize = "cover";

  const closeButton = document.createElement("button");
  closeButton.classList.add("popup__close");
  photoElement.append(caption, closeButton);

  popup.setAttribute("style", "background: rgba(0, 0, 0, 0.9)");
  popup.classList.add("popup_opened");

  popup.append(photoElement);

  closeButton.addEventListener("click", () => {
    popup.classList.remove("popup_opened");
    photoElement.remove();
  });
}

const imageElements = document.querySelectorAll(".element__image");
imageElements.forEach((image) => {
  image.addEventListener("click", openPhoto);
});
