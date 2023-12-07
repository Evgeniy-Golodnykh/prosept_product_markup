import { useState, useEffect } from 'react';

import './GeneralAnalytics.css';

import { mainApi } from '../../utils/MainApi';

import GeneralAnalyticsDiagram from './GeneralAnalyticsDiagram/GeneralAnalyticsDiagram';
import GeneralAnalyticsTable from './GeneralAnalyticsTable/GeneralAnalyticsTable';

export default function GeneralAnalytics() {

  const [dealersProducts, setDealersProducts] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null)
  const [isLoadingGeneralAnalytics, setIsLoadingGeneralAnalytics] = useState(false);

  useEffect(() => {
    setIsLoadingGeneralAnalytics(true);
    mainApi.getAllDealersProducts()
      .then((data) => {
        mainApi.getAllDealers()
          .then((arr) => {
            const newArr = arr.sort((a, b) => a.name.localeCompare(b.name));
            setDealers(newArr);
            for (let i = 0; i < data.length; i++) {
              const dealerId = data[i].dealer_id;
              const dealer = arr.find(dealer => dealer.id === dealerId);
              if (dealer) {
                data[i].dealer_name = dealer.name;
              }
            }
            return data
          })
          .then((dealersProducts) => {
            setDealersProducts(dealersProducts)
          })
          .finally(() => {
            setIsLoadingGeneralAnalytics(false)
          })
      })
      .catch((err) => {
        console.error(err)
      });
  }, []);

  return (
    <section className='general-analytics'>
      <div className='general-analytics__container'>
        <GeneralAnalyticsDiagram
          dealersProducts={dealersProducts}
          selectedDealer={selectedDealer}
          isLoadingGeneralAnalytics={isLoadingGeneralAnalytics} />
        <GeneralAnalyticsTable
          dealers={dealers}
          dealersProducts={dealersProducts}
          setSelectedDealer={setSelectedDealer}
          isLoadingGeneralAnalytics={isLoadingGeneralAnalytics} />
      </div>
    </section>
  )
}
