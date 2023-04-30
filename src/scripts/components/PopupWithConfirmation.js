import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitBtn = this._form.querySelector('.form__submit-button');
    this._submitBtnText = this._submitBtn.textContent;
  }

  submitCallback(removing) {
    this._handleSubmit = removing;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
  }


renderLoading(isLoading) {
  if (isLoading) {
    this._submitBtn.textContent = 'Удаление...';
  } else {
    this._submitBtn.textContent = this._submitBtnText;
  }
}

}