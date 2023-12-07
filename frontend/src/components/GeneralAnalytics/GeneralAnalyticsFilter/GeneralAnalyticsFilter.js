import { useState, useRef } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';

import './GeneralAnalyticsFilter.css';

import {
  all,
  yes,
  no,
  notСonsidered,
  postponed,
  nameOfProduct,
  recordingDate,
  seller,
  status,
  article,
} from '../../../utils/constants';

function GeneralAnalyticsFilter(props) {

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
    if (e.target.classList.contains('general-analytics-dropdown-menu__item')) {
      setDropdownMenuIsOpen(!dropdownMenuIsOpen)
      setFilter(e.target.textContent)
      props.setSelectedDealer(e.target.textContent)
    }
    if (e.target.textContent === all) {
      setFilter(null)
      props.setSelectedDealer(null)
    }
  }

  function handleSelectStatus(e) {
    if (e.target.classList.contains('general-analytics-dropdown-menu__item')) {
      setDropdownMenuIsOpen(!dropdownMenuIsOpen)
      setFilter(e.target.textContent)
    }
    if (e.target.textContent === all) {
      setFilter(null)
    }
  }

  useOutsideClick(dropdownMenuRef, handleCloseDropdownMenu, dropdownMenuIsOpen)

  if (props.column.Header === nameOfProduct || props.column.Header === recordingDate || props.column.Header === article) {
    return (
      <form className='general-analytics-filter-form' >
        <input
          className='general-analytics-filter-input'
          type='text'
          autoComplete="off"
          value={filterValue || ''}
          onChange={(e) => setFilter(e.target.value)} />
      </form>
    )
  } else {
    return (
      <div className='general-analytics-dropdown-menu'>
        <div ref={dropdownMenuRef} className='general-analytics-dropdown-menu__select' onClick={handleOpenDropdownMenu}>
          <span className='general-analytics-dropdown-menu__selected'>{filterValue ? filterValue : all} </span>
          <div className={`general-analytics-dropdown-menu__caret`}></div>
        </div>
        {props.column.Header === status &&
          (
            <ul
              className={`general-analytics-dropdown-menu__list ${dropdownMenuIsOpen && 'general-analytics-dropdown-menu__list_open'}`}
              onClick={handleSelectStatus}>
              <li className='general-analytics-dropdown-menu__item'>{all}</li>
              <li className='general-analytics-dropdown-menu__item'>{yes}</li>
              <li className='general-analytics-dropdown-menu__item'>{no}</li>
              <li className='general-analytics-dropdown-menu__item'>{notСonsidered}</li>
              <li className='general-analytics-dropdown-menu__item'>{postponed}</li>
            </ul>
          )
        }
        {props.column.Header === seller &&
          (
            <ul
              className={`general-analytics-dropdown-menu__list ${dropdownMenuIsOpen && 'general-analytics-dropdown-menu__list_open'}`}
              onClick={handleSelectDealer}>
              <li className='general-analytics-dropdown-menu__item'>{all}</li>
              {props.dealers.map((obj, index) => {
                return (
                  <li key={index} className='general-analytics-dropdown-menu__item'>{obj.name}</li>
                )
              })}
            </ul>
          )}
      </div>
    )
  }
};

export default GeneralAnalyticsFilter;
