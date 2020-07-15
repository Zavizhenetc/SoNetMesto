"use strict";
export class Popup {
  constructor(container) {
    this.container = container;
    this.closeButton = this.container.querySelector(".popup__close"); 
    this.setEventListenersPopup();

  }

  open() {
    this.container.classList.add("popup_is-opened"); 
  }

  close() {
    this.container.classList.remove("popup_is-opened");
  }

  setEventListenersPopup(){
    // this.closeButton.addEventListener("click", () =>this.close());
    this.closeButton.addEventListener("click", this.close.bind(this));

  }
}
