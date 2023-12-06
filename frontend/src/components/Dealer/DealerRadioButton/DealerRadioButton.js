import './DealerRadioButton.css';

function DealerRadioButton(props) {

  function handleChange() {
    props.getRecomendationToDealerProduct(props.rowId)
  }

  return (
    <label className='dealer-radio-button-label' htmlFor={props.rowId}>
      <input
        id={props.rowId}
        className='dealer-radio-button-input'
        type='radio'
        name="dealerProduct"
        onChange={handleChange} />
      <div className='dealer-radio-button'></div>
    </label>
  )
};

export default DealerRadioButton;
