import React from 'react';

import './Main.css';

import Dealer from '../Dealer/Dealer';
import Manufacturer from '../Manufacturer/Manufacturer';

export default function Main(props) {
  return (
    <main className='main'>
      <Manufacturer
        onComparePosition={props.onComparePosition}
        onNotComparePosition={props.onNotComparePosition}
        onPostonePosition={props.onPostonePosition}
        recommendation={props.recommendation}
      />
      <Dealer
        pendingDealersProducts={props.pendingDealersProducts}
        getRecomendationToDealerProduct={props.getRecomendationToDealerProduct}
      />
    </main>
  )
}
