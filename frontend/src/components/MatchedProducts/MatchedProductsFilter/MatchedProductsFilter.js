import { useState, useRef } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';

import './MatchedProductsFilter.css';

import {
  all,
  dealerProductName,
  manufacturerProductName,
  dealerArticle,
  manufaturerArticle,
  seller,
} from '../../../utils/constants.js';

function MatchedProductsFilter(props) {

  const [dropdownMenuIsOpen, setDropdownMenuIsOpen] = useState(false);

  const dropdownMenuRef = useRef(null);

  const { filterValue, setFilter } = props.column;

  function handleOpenDropdownMenu(e) {
    setDropdownMenuIsOpen(!dropdownMenuIsOpen)
  }

  function handleCloseDropdownMenu(e) {
    setDropdownMenuIsOpen(false)
  }

  function handleSelectDealer(e) {
    if (e.target.classList.contains('matched-products-dropdown-menu__item')) {
      setDropdownMenuIsOpen(!dropdownMenuIsOpen)
      setFilter(e.target.textContent)
    }
    if (e.target.textContent === all) {
      setFilter(null)
    }
  }

  useOutsideClick(dropdownMenuRef, handleCloseDropdownMenu, dropdownMenuIsOpen)

  if (props.column.Header === dealerProductName
    || props.column.Header === manufacturerProductName
    || props.column.Header === dealerArticle
    || props.column.Header === manufaturerArticle) {
    return (
      <form className='matched-products-filter-form' >
        <input
          className='matched-products-filter-input'
          type='text'
          autoComplete="off"
          value={filterValue || ''}
          onChange={(e) => setFilter(e.target.value)} />
      </form>
    )
  } else {
    return (
      <div className='matched-products-dropdown-menu'>
        <div ref={dropdownMenuRef} className='matched-products-dropdown-menu__select' onClick={handleOpenDropdownMenu}>
          <span className='matched-products-dropdown-menu__selected'>{filterValue ? filterValue : all} </span>
          <div className={`matched-products-dropdown-menu__caret`}></div>
        </div>
        {props.column.Header === seller &&
          (
            <ul
              className={`matched-products-dropdown-menu__list ${dropdownMenuIsOpen && 'matched-products-dropdown-menu__list_open'}`}
              onClick={handleSelectDealer}>
              <li className='matched-products-dropdown-menu__item'>{all}</li>
              {props.dealers.map((obj, index) => {
                return (
                  <li key={index} className='matched-products-dropdown-menu__item'>{obj.name}</li>
                )
              })}
            </ul>
          )}
      </div>
    )
  }
};

export default MatchedProductsFilter;
