import { useEffect } from 'react';

import './DealerRadioButton.css';

function DealerRadioButton(props) {

  useEffect(() => {
    // Сбрасываем атрибут checked всех радиокнопок при каждом перерендере компонента
    const resetRadioButtons = () => {
      const radioButtons = document.querySelectorAll('input[type="radio"]');
      radioButtons.forEach((radioButton) => {
        radioButton.checked = false;
      });
    };
    resetRadioButtons();
    // Возвращаем функцию обратного вызова для выполнения при размонтировании компонента
    return () => {
      resetRadioButtons();
    };
  }, [props.pendingDealersProducts]);

  function handleChange() {
    props.getRecomendationToDealerProduct(props.rowId)
    props.setIsPostponed(props.rowStatus)
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
