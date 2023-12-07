import { useState, useRef } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';

import './GeneralAnalyticsDropdownMenu.css';

function GeneralAnalyticsDropdownMenu({ column, dealers, setSelectedDealer }) {

  const [dropdownMenuIsOpen, setDropdownMenuIsOpen] = useState(false);

  const dropdownMenuRef = useRef(null);

  const { filterValue, setFilter } = column;

  function handleOpenDropdownMenu(e) {
    setDropdownMenuIsOpen(!dropdownMenuIsOpen)
  }

  function handleCloseDropdownMenu(e) {
    setDropdownMenuIsOpen(false)
  }

  function handleSelectOption(e) {
    if (e.target.classList.contains('general-analytics-dropdown-menu__item')) {
      setDropdownMenuIsOpen(!dropdownMenuIsOpen)
      setFilter(e.target.textContent)
      setSelectedDealer(e.target.textContent)
    }
    if (e.target.textContent === 'Все') {
      setFilter(null)
      setSelectedDealer(null)
    }
  }

  useOutsideClick(dropdownMenuRef, handleCloseDropdownMenu, dropdownMenuIsOpen)

  return (
    <div className='general-analytics-dropdown-menu'>
      <div ref={dropdownMenuRef} className='general-analytics-dropdown-menu__select' onClick={handleOpenDropdownMenu}>
        <span className='general-analytics-dropdown-menu__selected'>{filterValue ? filterValue : 'Все'} </span>
        <div className={`general-analytics-dropdown-menu__caret`}></div>
      </div>
      <ul
        className={`general-analytics-dropdown-menu__list ${dropdownMenuIsOpen && 'general-analytics-dropdown-menu__list_open'}`}
        onClick={handleSelectOption}>
        <li className='general-analytics-dropdown-menu__item'>Все</li>
        {dealers.map((obj, index) => {
          return (
            <li key={index} className='general-analytics-dropdown-menu__item'>{obj.name}</li>
          )
        })}
      </ul>
    </div>
  )
};

export default GeneralAnalyticsDropdownMenu;
