export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const userInfo = {
      username: this._name.textContent,
      job: this._job.textContent,
    }
    return userInfo;
  }

  setUserInfo({username, job}) {
    this._name.textContent = username;
    this._job.textContent = job;
  }
}