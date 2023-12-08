import React from 'react';

import './ManufacturerRadioButton.css';

function ManufacturerRadioButton(props) {

  function handleChange(evt) {
    props.setRadioButtonIsSelected(props.rowId);
    props.getRadioValue(props.rowId);
    props.getMatchingPos(props.rowIndex + 1);
  }

  return (
    <label className='manufacturer-radio-button-label' htmlFor={props.rowId}>
      <input
        className='manufacturer-radio-button-input'
        id={props.rowId}
        type='radio'
        name="product"
        checked={props.radioButtonIsSelected === props.rowId}
        onChange={handleChange} />
      <div className='manufacturer-radio-button'></div>
    </label >
  )
};

export default ManufacturerRadioButton;
