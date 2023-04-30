export default class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._job.textContent,
      avatar: this._avatar.src
    }
    return userInfo;
  }

  setUserInfo({name, about, avatar}) {
    this._name.textContent = name;
    this._job.textContent = about;
    const img = new Image();
    img.onload = () => {
      this._avatar.src = avatar;
    }
    img.src = avatar;
  }
}