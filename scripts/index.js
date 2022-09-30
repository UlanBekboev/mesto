const popupOpenButton = document.querySelector(".profile__edit-button_action_open");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close");
const formSubmitButton = popup.querySelector(".form__submit-button");
const nameInput = popup.querySelector(".form__item_el_heading");
const jobInput = popup.querySelector(".form__item_el_subheading");
const form = popup.querySelector(".form");
const Name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__text");

const popupToggle = function (event) {
  popup.classList.toggle("popup_opened");
};
popupOpenButton.addEventListener("click", popupToggle);
popupCloseButton.addEventListener("click", popupToggle);

function formAutoFill() {
  nameInput.value = Name.textContent;
  jobInput.value = job.textContent;
}

popupOpenButton.addEventListener("click", formAutoFill);

function formSubmitHandler(evt) {
  evt.preventDefault();
  Name.textContent = nameInput.value;
  job.textContent = jobInput.value;
}

form.addEventListener("submit", formSubmitHandler);
formSubmitButton.addEventListener("click", popupToggle);
