import React from 'react';
import { useNavigate } from "react-router-dom";

import './NotFound.css';

import { notFoundError, notFoundErrorMessage } from '../../utils/constants';

export default function NotFound() {

  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
      <section className="not-found">
        <div className="not-found__text-container">
          <h1 className="not-found__title">{notFoundError}</h1>
          <p className="not-found__text">{notFoundErrorMessage}</p>
          <button className="error-button error-button_enabled not-found__btn" type="button" onClick={goBack}>Назад</button>
        </div>

      </section>
  )
}
