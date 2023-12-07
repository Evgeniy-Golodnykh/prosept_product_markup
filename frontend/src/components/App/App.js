import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';
import GeneralAnalytics from '../GeneralAnalytics/GeneralAnalytics';

import { mainApi } from '../../utils/MainApi';

function App() {
  const [pendingDealersProducts, setPendingDealersProducts] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [productKey, setProductKey] = useState('');

  function handleComparePosition(productId) {
    Promise.all([mainApi.comparePosition(productKey, productId), mainApi.updatePosition(productKey, "Да")])
      .then(() => {
        setRecommendation([]);
        getPendingDealersProducts();
      })
      .catch((err) => console.log(err));

  }

  function handleNotComparePosition() {
    mainApi.updatePosition(productKey, "Нет")
      .then(() => {
        setRecommendation([]);
        getPendingDealersProducts();
      })
      .catch((err) => console.log(err));
  }

  function handlePostponePosition() {
    mainApi.updatePosition(productKey, "Отложить")
      .then(() => {
        setRecommendation([]);
        getPendingDealersProducts();
      })
      .catch((err) => console.log(err));
  }

  function getRecomendationToDealerProduct(value) {
    setProductKey(value)
    mainApi.getRecomendation(value)
      .then((recommendation) => {
        setRecommendation(recommendation);
        console.log(recommendation);
      })
      .catch((err) => console.log(err));
  }

  function getPendingDealersProducts() {
    mainApi.getPendingDealersProducts()
      .then((pendingDealersProducts) => {
        setPendingDealersProducts(pendingDealersProducts);
        console.log(pendingDealersProducts);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getPendingDealersProducts();
  }, []);

  return (
    <div className='page'>
      <Header />
      <Routes>
        <Route path="/" element={<Main
          onComparePosition={handleComparePosition}
          onNotComparePosition={handleNotComparePosition}
          onPostonePosition={handlePostponePosition}
          pendingDealersProducts={pendingDealersProducts}
          recommendation={recommendation}
          getRecomendationToDealerProduct={getRecomendationToDealerProduct}
        />} />
        <Route path="/statistics/dealers" element={<GeneralAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
