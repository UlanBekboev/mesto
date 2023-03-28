export default class FormValidator  {
  constructor(options) {
    this._formSelector = options.formSelector;
    this._submitSelector = options.submitSelector;
    this._inputSelector = options.inputSelector;
    this._inputSectionSelector = options.inputSectionSelector;
    this._inputErrorSelector = options.inputErrorSelector;
    this._inputErrorClass = options.inputErrorClass;
    this._formInputTypeError = options.formInputTypeError;
    this._disabledButtonClass = options.disabledButtonClass;
  }

  _showInputError = (formError, errorMessage, inputElement) => {
    formError.textContent = errorMessage;
    formError.classList.add(this._inputErrorClass);
    inputElement.classList.add(this._formInputTypeError);
  };
  
  _hideInputError = (formError, inputElement) => {
    formError.textContent = '';
    formError.classList.remove(this._inputErrorClass);
    inputElement.classList.remove(this._formInputTypeError);
  };

  removeErrors = (popup) => {
    const inputs = Array.from(popup.querySelectorAll(this._inputSelector));
    inputs.forEach((inputElement) => {
    const inputSectionElement = inputElement.closest(this._inputSectionSelector);
    const errorElement = inputSectionElement.querySelector(`.${inputElement.id}-error`); 
    this._hideInputError(errorElement, inputElement);
    });
  }

  _setInputState = (inputElement, isValid) => {
    const inputSectionElement = inputElement.closest(this._inputSectionSelector);
    const errorElement = inputSectionElement.querySelector(`.${inputElement.id}-error`); 
  
    if (isValid) {
      this._hideInputError(errorElement, inputElement);
    } else {
      this._showInputError(errorElement, inputElement.validationMessage, inputElement);
    }
  };
  
  _toggleInputState = (inputElement) => {
    const isValid = inputElement.validity.valid;
    this._setInputState(inputElement, isValid);
  };
  
  
  _enableButton = (buttonElement) => {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(this._disabledButtonClass);
  };
  
  _disableButton = (buttonElement) => {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(this._disabledButtonClass);
  };
  
  
  toggleButtonState = (inputs, submitElement) => {
    const formIsValid = inputs.every(inputElement => inputElement.validity.valid);
    if (formIsValid) {
      this._enableButton(submitElement);
    } else {
      this._disableButton(submitElement);
    }
  };
  
  
  _setEventListeners = (form) => {
    const submitElement = form.querySelector(this._submitSelector);
    const inputs = Array.from(form.querySelectorAll(this._inputSelector));
    this.toggleButtonState(inputs, submitElement);
      form.addEventListener('reset', () => {
        this._disableButton(submitElement);
      });
    
    inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._toggleInputState(inputElement);
        this.toggleButtonState(inputs, submitElement);
      });
    });	
  }

  enableValidation = () => {
    const forms = Array.from(document.querySelectorAll(this._formSelector));
    forms.forEach((form) => {
      this._setEventListeners(form);
    });
  };
}
