"use strict";
class FormValidator {
  constructor(form) {
    this.form = form;
    this.button = this.form.querySelector(".popup__button");
    this.isFieldValid = this.isFieldValid.bind(this);
  }

  checkInputValidity(input) {
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(errorMessages.errorEmpty);
      return false;
    }
    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(errorMessages.errorLength);
      return false;
    }
    if (input.validity.typeMismatch && input.type === "url") {
      input.setCustomValidity(errorMessages.errorUrl);
      return false;
    }
    return input.checkValidity();
  }

  isFieldValid(event) {
    event.preventDefault();
    const input = event.target;
    const currentForm = event.currentTarget;

    const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
    const valid = this.checkInputValidity(input);
    errorElem.textContent = input.validationMessage;

    const isFormValid = currentForm.checkValidity();
    this.setSubmitButtonState(isFormValid);
  
    return valid;
  }

  resetError() {
    const [...errors] = this.form.querySelectorAll('span.error');
    errors.forEach((error) => {
      error.textContent = "";
    });
  }

  setSubmitButtonState(state) {
    /**
     * Можно лучше:
     * this.button.classList.toggle("popup__button_valid", state);
     */
    if (state) {
      this.button.classList.add("popup__button_valid");
    } else {
      this.button.classList.remove("popup__button_valid");
    }
  }
 
 
  setEventListenersValidation(){
    this.form.addEventListener('input', this.isFieldValid);
  }
}