
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

  _setEventListeners() {
    const deleteButton = this._element.querySelector(".element__trash");
    const likeButton = this._element.querySelector(".element__like");

    deleteButton.addEventListener("click", (e) => {
      e.target.closest(".element").remove();
      });
    
    likeButton.addEventListener("click", (e) => {
      e.target.classList.toggle("element__like_active");
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
  
    return this._element;
  }  
}