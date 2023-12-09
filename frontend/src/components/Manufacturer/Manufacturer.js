import React from 'react';

import './Manufacturer.css';

import ManufacturerProductForm from './ManufacturerProductForm/ManufacturerProductForm';

function Manufacturer(props) {

  return (
    <section className='manufacturer'>
      <h2 className='manufacturer__title'>Товары производителя</h2>
      <ManufacturerProductForm
        onComparePosition={props.onComparePosition}
        onNotComparePosition={props.onNotComparePosition}
        onPostonePosition={props.onPostonePosition}
        recommendation={props.recommendation}
        popup={props.popup}
        error={props.error}
        isPostponed={props.isPostponed}
      />
    </section>
  )
};

export default Manufacturer;
