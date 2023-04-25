export default class FormValidator  {
  constructor(options, formElement) {
    this._formElement = formElement;
    this._submitSelector = options.submitSelector; 
    this._inputSelector = options.inputSelector; 
    this._submitButton = this._formElement.querySelector(this._submitSelector);
    this._inputList = this._formElement.querySelectorAll(this._inputSelector); 
    this._inputArray = Array.from(this._inputList);
    this._inputSectionSelector = options.inputSectionSelector;
    this._inputErrorSelector = options.inputErrorSelector;
    this._inputErrorClass = options.inputErrorClass;
    this._formInputTypeError = options.formInputTypeError;
    this._disabledButtonClass = options.disabledButtonClass;
  }

  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);  
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._inputErrorClass);
    inputElement.classList.add(this._formInputTypeError);
  };
  
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._inputErrorClass);
    inputElement.classList.remove(this._formInputTypeError);
  };
  
  resetValidation() {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

  }

  _toggleInputState = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  };
  
  
  enableButton = () => {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove(this._disabledButtonClass);
  };
  
  disableButton = () => {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.add(this._disabledButtonClass);
  };
  
  
  toggleButtonState = () => {
    const formIsValid = this._inputArray.every(inputElement => inputElement.validity.valid);
    if (formIsValid) {
      this.enableButton();
    } else {
      this.disableButton();
    }
  };
  
  
  _setEventListeners = () => {
    this.toggleButtonState();
    this._formElement.addEventListener('reset', () => { 
      this.disableButton(); 
    }); 

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleInputState(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation = () => {
    this._setEventListeners();
  };
}
