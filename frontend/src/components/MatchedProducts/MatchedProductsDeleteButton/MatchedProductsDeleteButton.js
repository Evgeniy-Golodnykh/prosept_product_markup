import React from 'react';

import './MatchedProductsDeleteButton.css';

import { mainApi } from '../../../utils/MainApi';

import { notСonsidered } from '../../../utils/constants.js';

function MatchedProductsDeleteButton(props) {

  function handleDelete() {
    props.setIsLoadingMatchedProducts(true);
    Promise.all([mainApi.deleteMatchedProducts(props.keyId), mainApi.updatePosition(props.keyId, notСonsidered)])
      .then(() => {
        mainApi.getMatchedProducts()
          .then((matchedProducts) => {
            props.setMatchedProducts(matchedProducts);
          })
      })
      .catch((err) => console.log(err))
      .finally(() => {
        props.setIsLoadingMatchedProducts(false);
      })
  }

  return (
    <button className='matched-products-delete-button' onClick={handleDelete}>
      Удалить
    </button>
  )
};

export default MatchedProductsDeleteButton;
