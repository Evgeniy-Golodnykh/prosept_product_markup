import React from 'react';

import './Dealer.css';

import DealerProductTable from './DealerProductTable/DealerProductTable';
import Preloader from '../Preloader/Preloader';

function Dealer(props) {
  return (
    <section className='dealer'>
      <h2 className='dealer__title'>Товары дилеров</h2>
      {props.isLoadingDealerProducts
        ? <Preloader />
        : <DealerProductTable
          pendingDealersProducts={props.pendingDealersProducts}
          getRecomendationToDealerProduct={props.getRecomendationToDealerProduct}
          dealers={props.dealers}
          setIsPostponed={props.setIsPostponed}
        />}
    </section>
  )
};

export default Dealer;
