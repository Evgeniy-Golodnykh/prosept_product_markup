import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import {
  yes,
  no,
  postponed,
  matchingPostponed,
  matched,
  notMacthed,
  somethingWentWrong,
} from '../../utils/constants';

import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';
import GeneralAnalytics from '../GeneralAnalytics/GeneralAnalytics';
import MatchedProducts from '../MatchedProducts/MatchedProducts';

import { mainApi } from '../../utils/MainApi';

function App() {

  const [pendingDealersProducts, setPendingDealersProducts] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [productKey, setProductKey] = useState('');
  const [dealers, setDealers] = useState([]);
  const [popup, setPopup] = useState('');
  const [error, setError] = useState('');
  const [isPostponed, setIsPostponed] = useState('');

  function showPopupMsg(setter, msg) {
    setter(msg)
    setTimeout(() => {
      setter('');
    }, 2000);
  }

  function handleComparePosition(productId, matchingPos) {
    Promise.all([mainApi.comparePosition(productKey, productId, matchingPos), mainApi.updatePosition(productKey, yes)])
      .then(() => {
        setRecommendation([]);
        setPendingDealersProducts([]);
        getPendingDealersProducts();
        showPopupMsg(setPopup, matched)
      })
      .catch((err) => {
        console.error(err)
        setRecommendation([]);
        showPopupMsg(setError, somethingWentWrong)
      })
  }

  function handleNotComparePosition() {
    mainApi.updatePosition(productKey, no)
      .then(() => {
        setRecommendation([]);
        setPendingDealersProducts([]);
        getPendingDealersProducts();
        showPopupMsg(setPopup, notMacthed)
      })
      .catch((err) => {
        console.error(err)
        setRecommendation([]);
        showPopupMsg(setError, somethingWentWrong)
      })
  }

  function handlePostponePosition() {
    mainApi.updatePosition(productKey, postponed)
      .then(() => {
        setRecommendation([]);
        setPendingDealersProducts([]);
        getPendingDealersProducts();
        showPopupMsg(setPopup, matchingPostponed)
      })
      .catch((err) => {
        console.error(err)
        setRecommendation([]);
        showPopupMsg(setError, somethingWentWrong)
      })
  }

  function getRecomendationToDealerProduct(value) {
    setProductKey(value)
    mainApi.getRecomendation(value)
      .then((recommendation) => {
        setRecommendation(recommendation);
      })
      .catch((err) => console.error(err))
  }

  function getPendingDealersProducts() {
    mainApi.getPendingDealersProducts()
      .then((pendingDealersProducts) => {
        mainApi.getAllDealers()
          .then((arr) => {
            const newArr = arr.sort((a, b) => a.name.localeCompare(b.name));
            setDealers(newArr);
            for (let i = 0; i < pendingDealersProducts.length; i++) {
              const dealerId = pendingDealersProducts[i].dealer_id;
              const dealer = arr.find(dealer => dealer.id === dealerId);
              if (dealer) {
                pendingDealersProducts[i].dealer_name = dealer.name;
              }
            }
            return pendingDealersProducts
          })
          .then((pendingDealersProducts) => {
            setPendingDealersProducts(pendingDealersProducts);
          })
      })
      .catch((err) => console.error(err))
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
          setIsPostponed={setIsPostponed}
          isPostponed={isPostponed}
          popup={popup}
          dealers={dealers}
          error={error}
        />} />
        <Route path="/statistics/dealers" element={<GeneralAnalytics />} />
        <Route path="/statistics/matches" element={<MatchedProducts dealers={dealers} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
