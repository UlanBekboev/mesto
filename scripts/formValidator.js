export default class FormValidator  {
  constructor(options, inputElement) {
    this._formSelector = options.formSelector;
    this._submitSelector = options.submitSelector;
    this._inputSelector = options.inputSelector;
    this._inputSectionSelector = options.inputSectionSelector;
    this._inputErrorSelector = options.inputErrorSelector;
    this._inputErrorClass = options.inputErrorClass;
    this._formInputTypeError = options.formInputTypeError;
    this._disabledButtonClass = options.disabledButtonClass;
    this._inputElement = inputElement;
  }

  _showInputError = () => {
    const errorElement = this._inputElement.closest(this._inputSectionSelector).querySelector(`.${this._inputElement.id}-error`);  
    errorElement.textContent = this._inputElement.validationMessage;
    errorElement.classList.add(this._inputErrorClass);
    this._inputElement.classList.add(this._formInputTypeError);
  };
  
  hideInputError = () => {
    const errorElement = this._inputElement.closest(this._inputSectionSelector).querySelector(`.${this._inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._inputErrorClass);
    this._inputElement.classList.remove(this._formInputTypeError);
  };
  
  _toggleInputState = () => {
    if (this._inputElement.validity.valid) {
      this.hideInputError();
    } else {
      this._showInputError();
    }
  };
  
  
  enableButton = () => {
    const formElement = this._inputElement.closest('form');
    const submitButton = formElement.querySelector(this._submitSelector);
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(this._disabledButtonClass);
  };
  
  disableButton = () => {
    const formElement = this._inputElement.closest('form');
    const submitButton = formElement.querySelector(this._submitSelector);
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(this._disabledButtonClass);
  };
  
  
  toggleButtonState = () => {
    const form = this._inputElement.closest('form');
    const inputs = Array.from(form.querySelectorAll(this._inputSelector)); 
    const formIsValid = inputs.every(inputElement => inputElement.validity.valid);
    if (formIsValid) {
      this.enableButton();
    } else {
      this.disableButton();
    }
  };
  
  
  _setEventListeners = () => {
    this.toggleButtonState();
    this._inputElement.closest('form').addEventListener('reset', () => { 
      this.disableButton(); 
    }); 

    this._inputElement.addEventListener('input', () => {
      this._toggleInputState();
      this.toggleButtonState();
    });
  }

  enableValidation = () => {
    this._setEventListeners();
  };
}
