const popupOpenButton = document.querySelector(".profile__edit-button_action_open");
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close");
const Name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__text");

function addForm() {
  const popupTemplate = document.querySelector('#popup-template').content;
  const popupElement = popupTemplate.querySelector('.popup__container').cloneNode(true);
  popupElement.querySelector('.form__item_el_heading').value = Name.textContent;
  popupElement.querySelector('.form__item_el_subheading').value = job.textContent;
  popupElement.querySelector('.form').addEventListener("submit", function(evt) {
    evt.preventDefault();
    Name.textContent = popupElement.querySelector('.form__item_el_heading').value;
    job.textContent = popupElement.querySelector('.form__item_el_subheading').value;
    popup.classList.remove("popup_opened");
  }); 
  popupElement.querySelector('.popup__close').addEventListener('click', function(){
    popup.classList.remove('popup_opened');
 });
  popup.append(popupElement);
}
addForm();

const popupToggle = function (event) {
  popup.classList.toggle("popup_opened");
}

popupOpenButton.addEventListener("click", popupToggle);








