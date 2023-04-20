export default class Card {
  constructor(data, templateSelector, {handleCardClick}) {
    this._data = data;
    this._image = data.link;
    this._title = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    const cardImage = this._element.querySelector('.element__image');

    deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
      });
    
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
      }); 

      cardImage.addEventListener('click', () => {
        this._handleCardClick(this._data);
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

