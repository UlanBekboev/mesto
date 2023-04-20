import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupName = this._popup.querySelector('.popup__caption');
}

  openPopup(data) {
    this._popupImage.src = data.link;
    this._popupName.textContent = data.name;
    this._popupImage.alt = `Картина: местность ${data.name}`;
    super.openPopup();
    super.setEventListeners();
  }
}