export default class Section {
  constructor ({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  renderItems(data) {
    if (Array.isArray(data)) {
      data.forEach(item => {
        this._renderer(item);
      }); 
    } else {
      this._renderer(data);
    }
  }
}