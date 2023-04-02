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

  _handleOpenPhoto() {
    cardImagePopup.src = this._image;
    cardImagePopup.alt = `Картина: местность ${this._title}`;
    cardTitlePopup.textContent = this._title;
    openPopup(photoPopup); 
  }

  _setEventListeners() {
    const deleteButton = this._element.querySelector(".element__trash");
    this._likeButton = this._element.querySelector(".element__like");
    const cardImage = this._element.querySelector('.element__image');

    deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
      });
    
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
      }); 

      cardImage.addEventListener('click', () => {
      this._handleOpenPhoto();
    });
  }

  renderCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.element__image');
    const cardTitle = this._element.querySelector('.element__title');
    cardTitle.textContent = this._title;
    cardImage.src = this._image;
    cardImage.alt = `Картина: местность ${this._title}`;

    this._setEventListeners();
    return this._element;
  };  
}