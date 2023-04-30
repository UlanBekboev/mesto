export default class Card {
  constructor(data, templateSelector, {handleCardClick, userId, handleDeleteIconClick, handleSetLike, handleRemoveLike}) {
    this._data = data;
    this._image = data.link;
    this._title = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._likes = data.likes;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }
  
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      
      return cardElement;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteIconClick(this._cardId);
      });
    
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains('element__like_active')) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleSetLike(this._cardId);
      }
    }); 

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

  renderCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');
    this._deleteButton = this._element.querySelector(".element__trash");
    this._likeButton = this._element.querySelector(".element__like");
    this._likesNumber = this._element.querySelector('.element__likes-num');
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = `Картина: местность ${this._title}`;
    this._hasDeleteBtn();
    this._isCardLiked();
    this._likesNumber.textContent = this._likes.length;

    this._setEventListeners();
    return this._element;
  };  

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeButton.classList.add('element__like_active');
    }
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._likesNumber.textContent = this._likes.length;
    this._likeButton.classList.toggle('element__like_active');
  }

  _hasDeleteBtn() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteButton.remove();
    }
  }
}

