import { useState, useRef } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';

import './DealerColumnFilter.css';

import {
  all,
  nameOfProduct,
  recordingDate,
  seller,
} from '../../../utils/constants';

function DealerColumnFilter(props) {

  const { filterValue, setFilter } = props.column;
  const [dropdownMenuIsOpen, setDropdownMenuIsOpen] = useState(false);
  const dropdownMenuRef = useRef(null);

  function handleOpenDropdownMenu(e) {
    setDropdownMenuIsOpen(!dropdownMenuIsOpen)
  }

  function handleCloseDropdownMenu(e) {
    setDropdownMenuIsOpen(false)
  }

  function handleSelectDealer(e) {
    if (e.target.classList.contains('dealer-dropdown-menu__item')) {
      setDropdownMenuIsOpen(!dropdownMenuIsOpen)
      setFilter(e.target.textContent)
    }
    if (e.target.textContent === all) {
      setFilter(null)
    }
  }

  useOutsideClick(dropdownMenuRef, handleCloseDropdownMenu, dropdownMenuIsOpen)

  if (props.column.Header === nameOfProduct || props.column.Header === recordingDate) {
    return (
      <form className='dealer-column-filter' >
        <input
          className='dealer-column-filter__input'
          type='text'
          autoComplete="off"
          value={filterValue || ''}
          onChange={(e) => setFilter(e.target.value)} />
      </form>
    )
  } else {
    return (
      <div className='dealer-dropdown-menu'>
        <div ref={dropdownMenuRef} className='dealer-dropdown-menu__select' onClick={handleOpenDropdownMenu}>
          <span className='dealer-dropdown-menu__selected'>{filterValue ? filterValue : all} </span>
          <div className={`dealer-dropdown-menu__caret`}></div>
        </div>
        {props.column.Header === seller &&
          (
            <ul
              className={`dealer-dropdown-menu__list ${dropdownMenuIsOpen && 'dealer-dropdown-menu__list_open'}`}
              onClick={handleSelectDealer}>
              <li className='dealer-dropdown-menu__item'>{all}</li>
              {props.dealers.map((obj, index) => {
                return (
                  <li key={index} className='dealer-dropdown-menu__item'>{obj.name}</li>
                )
              })}
            </ul>
          )}
      </div>
    )
  }
}

export default DealerColumnFilter;
