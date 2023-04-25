import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._nameInput = document.querySelector(".form__input_el_heading");
    this._jobInput = document.querySelector(".form__input_el_subheading");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues({name, job}) {
    this._nameInput.value = name;
    this._jobInput.value = job;
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  } 

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.closePopup();
    });
  }
}