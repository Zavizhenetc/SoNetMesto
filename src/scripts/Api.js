export class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.urlCards = config.urlCards;
    this.urlUserinfo = config.urlUserinfo;
    this.headers = config.headers;

  }

  getBasicCards() {
    return fetch(`${this.baseUrl}/cards`, {
    // return fetch(`${this.urlCards}`, {
      method: "GET",
      headers: this.headers,
    }).then((res)=>  this._getResponseData(res));
  
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    })
    .then((res)=>  this._getResponseData(res));
    
  }

  patchUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    })
    .then((res)=>  this._getResponseData(res));
      
  }
  postCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      }),
    })
    .then((res)=>  this._getResponseData(res));
      
  }
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } 
      return Promise.reject(res.status);
    }
}
