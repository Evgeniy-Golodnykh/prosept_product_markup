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

  comparePosition(productKey, productId, matchingPos) {
    return fetch(`${this._url}/api/productdealerkey/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "key_id": productKey,
        "product_id": productId,
        "matching_position": matchingPos,
      })
    })
      .then(res => this._checkResponse(res))
  };

  getMatchedProducts() {
    return fetch(`${this._url}/api/productdealerkey/`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  };

  deleteMatchedProducts(dealerPriceKey) {
    return fetch(`${this._url}/api/productdealerkey/${dealerPriceKey}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }

}

export const mainApi = new MainApi();
