const showInputError = (formError, errorMessage, inputErrorClass, inputElement, formInputTypeError) => {
	formError.textContent = errorMessage;
	formError.classList.add(inputErrorClass);
  inputElement.classList.add(formInputTypeError);
};

const hideInputError = (formError, inputErrorClass, inputElement, formInputTypeError) => {
	formError.textContent = '';
	formError.classList.remove(inputErrorClass);
  inputElement.classList.remove(formInputTypeError);
};

const setInputState = (inputElement, isValid, options) => {
	const { inputSectionSelector, inputErrorClass, formInputTypeError } = options;
	const inputSectionElement = inputElement.closest(inputSectionSelector);
  const errorElement = inputSectionElement.querySelector(`.${inputElement.id}-error`); 

	if (isValid) {
		hideInputError(errorElement, inputErrorClass, inputElement, formInputTypeError);
	} else {
		showInputError(errorElement, inputElement.validationMessage, inputErrorClass, inputElement, formInputTypeError);
	}
};

const toggleInputState = (inputElement, options) => {
	const isValid = inputElement.validity.valid;
	setInputState(inputElement, isValid, options);
};


const enableButton = (buttonElement, disabledButtonClass) => {
	buttonElement.removeAttribute('disabled');
	buttonElement.classList.remove(disabledButtonClass);
};

const disableButton = (buttonElement, disabledButtonClass) => {
	buttonElement.setAttribute('disabled', true);
	buttonElement.classList.add(disabledButtonClass);
};


const toggleButtonState = (inputs, submitElement, disabledButtonClass) => {
	const formIsValid = inputs.every(inputElement => inputElement.validity.valid);

	if (formIsValid) {
		enableButton(submitElement, disabledButtonClass);
	} else {
		disableButton(submitElement, disabledButtonClass);
	}
};


const setEventListeners = (form, options) => {
	const submitElement = form.querySelector(options.submitSelector);
	const inputs = Array.from(form.querySelectorAll(options.inputSelector));
  toggleButtonState(inputs, submitElement, options.disabledButtonClass);

  form.addEventListener('reset', () => {
      disableButton(submitElement, options.disabledButtonClass);
  });
  
	inputs.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			toggleInputState(inputElement, options);
			toggleButtonState(inputs, submitElement, options.disabledButtonClass);
		});
	});
	
};


const enableValidation = ({
	formSelector,
	submitSelector,
	inputSelector,
	inputSectionSelector,
	inputErrorSelector,
	inputErrorClass,
  formInputTypeError,
	disabledButtonClass,
}) => {
	const forms = Array.from(document.querySelectorAll(formSelector));
	forms.forEach((form) => {
		setEventListeners(form, {
			submitSelector,
			inputSelector,
			inputSectionSelector,
			inputErrorSelector,
			inputErrorClass,
      formInputTypeError,
			disabledButtonClass,
		});
	});
};