class MainApi {
  constructor() {
    this._url = 'http://prosept.sytes.net';
    this._headers = {
      'Content-Type': 'application/json'
    }
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getAllDealersProducts() {
    return fetch(`${this._url}/api/dealerprice/`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }

  getAllDealers() {
    return fetch(`${this._url}/api/dealer/`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }

  getPendingDealersProducts() {
    console.log('compare');
    return fetch(`${this._url}/api/dealerprice/none_delay_status`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  };

  getRecomendation(product) {
    return fetch(`${this._url}/api/recommendation/${product}`, {
      method: 'POST',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  };

  updatePosition(productKey, status) {
    return fetch(`${this._url}/api/dealerprice/${productKey}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        "status": status,
      })
    })
      .then(res => this._checkResponse(res))
  };


  comparePosition(productKey, productId) {
    return fetch(`${this._url}/api/productdealerkey/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "key_id": productKey,
        "product_id": productId
      })
    })
      .then(res => this._checkResponse(res))
  };

  notComparePosition(product) {
    console.log('notCompare');
    // return fetch(`${this._url}/users/me`, {
    //   credentials: 'include',
    // })
    //   .then(res => this._checkResponse(res))
  };

  postponePosition(product) {
    console.log('postponePosition');
    // return fetch(`${this._url}/users/me`, {
    //   credentials: 'include',
    // })
    //   .then(res => this._checkResponse(res))
  };

}

export const mainApi = new MainApi();
