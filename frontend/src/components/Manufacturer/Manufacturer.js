import React from 'react';

import ManufacturerProductForm from './ManufacturerProductForm/ManufacturerProductForm';

import './Manufacturer.css';

function Manufacturer(props) {

  return (
    <section className='manufacturer'>
      <h2 className='manufacturer__title'>Товары производителя</h2>
      <ManufacturerProductForm
        onComparePosition={props.onComparePosition}
        onNotComparePosition={props.onNotComparePosition}
        onPostonePosition={props.onPostonePosition}
        recommendation={props.recommendation} />
    </section>
  )
};

export default Manufacturer;
