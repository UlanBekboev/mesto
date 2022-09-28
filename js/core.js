const popupOpenButton = document.querySelector(".profile__open-popup");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close");
const formElement = popup.querySelector(".form__submit-button");
const nameInput = popup.querySelector(".form__item_heading");
const jobInput = popup.querySelector(".form__item_subheading");
const formItem = popup.querySelector(".form__item");

const popupToggle = function (event) {
  popup.classList.toggle("popup_opened");
  console.log("нажали на кнопку");
};
popupOpenButton.addEventListener("click", popupToggle);
popupCloseButton.addEventListener("click", popupToggle);

let Name = document.querySelector(".profile__title");
let job = document.querySelector(".profile__text");
nameInput.value = Name.textContent;
jobInput.value = job.textContent;

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.value;
  jobInput.value;
}
formElement.addEventListener("submit", formSubmitHandler);
