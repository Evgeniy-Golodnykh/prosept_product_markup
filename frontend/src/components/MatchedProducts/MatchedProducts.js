import { useState, useEffect } from 'react';

import './MatchedProducts.css';

import { mainApi } from '../../utils/MainApi';

import MatchedProductsTable from './MatchedProductsTable/MatchedProductsTable';

export default function MatchedProducts({ dealers }) {

  const [isLoadingMatchedProducts, setIsLoadingMatchedProducts] = useState(false);
  const [matchedProducts, setMatchedProducts] = useState([]);

  useEffect(() => {
    setIsLoadingMatchedProducts(true);
    mainApi.getMatchedProducts()
      .then((products) => {
        setMatchedProducts(products);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoadingMatchedProducts(false);
      });
  }, []);

  return (
    <section className='matched-products'>
      <div className='matched-products__container'>
        <h2 className='matched-products__title'>Сопоставленные позиции</h2>
        <MatchedProductsTable
          isLoadingMatchedProducts={isLoadingMatchedProducts}
          matchedProducts={matchedProducts}
          dealers={dealers}
          setMatchedProducts={setMatchedProducts}
          setIsLoadingMatchedProducts={setIsLoadingMatchedProducts} />
      </div>

    </section>
  )
}
