const cardImagePopup = document.querySelector(".popup__image");
const cardTitlePopup = document.querySelector(".popup__caption");
const photoPopup = document.querySelector('.popup_type_photo');
import openPopup from "./index.js";
export default class Card {
  constructor(data, templateSelector) {
    this._image = data.link;
    this._title = data.name;
    this._templateSelector = templateSelector;
  }
  
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

      return cardElement;
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("element__like_active"); 
  }

  _setEventListeners() {
    const deleteButton = this._element.querySelector(".element__trash");
    this._likeButton = this._element.querySelector(".element__like");

    deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
      });
    
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
      }); 
  }

  renderCard(name, link) {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector('.element__image');
    const cardTitle = this._element.querySelector('.element__title');
    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = `Картина: местность ${name}`;

    cardImage.addEventListener('click', () => {
      cardImagePopup.src = cardImage.src;
      cardImagePopup.alt = cardImage.alt;
      cardTitlePopup.textContent = cardTitle.textContent;
      openPopup(photoPopup); 
    });
  
    return this._element;
  };  
}