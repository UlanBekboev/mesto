import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitBtn = this._form.querySelector('.form__submit-button');
    this._submitBtnText = this._submitBtn.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  } 

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = 'Сохранение...';
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
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