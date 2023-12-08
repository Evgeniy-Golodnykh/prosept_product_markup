import { useState, useRef } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';

import './MatchedProductsPagination.css';

import {
  minNumbOfPages,
  middleNumbOfPages,
  maxNumbOfPages,
} from '../../../utils/constants';

function MatchedProductsPagination({
  pageIndex,
  pageOptions,
  gotoPage,
  pageSize,
  setPageSize,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageCount }) {

  const dropdownMenuRef = useRef(null);

  const [value, setValue] = useState(pageIndex + 1)
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);

  function handleClickDecrement() {
    if (pageIndex > 0) {
      gotoPage(pageIndex - 1)
      setValue(pageIndex)
    }
  }

  function handleClickIncrement() {
    if (pageIndex + 1 < pageCount) {
      gotoPage(pageIndex + 1)
      setValue(pageIndex + 2)
    }
  }

  function handleChangeInput(e) {
    setValue(e.target.value);
    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
    gotoPage(pageNumber)
  }

  function handleToggleSelectMenu(e) {
    setSelectMenuIsOpen(!selectMenuIsOpen)
  }

  function handleCloseSelectMenu(e) {
    setSelectMenuIsOpen(false)
  }

  function handleSelectOption(e) {
    if (e.target.classList.contains('matched-products-pagination__dropdown-item')) {
      setPageSize(e.target.value);
      setSelectMenuIsOpen(!selectMenuIsOpen)
    }
  }

  useOutsideClick(dropdownMenuRef, handleCloseSelectMenu, selectMenuIsOpen)

  return (
    <div className='matched-products-pagination'>
      <div className='matched-products-pagination__dropdown'>
        <div ref={dropdownMenuRef} className='matched-products-pagination__select' onClick={handleToggleSelectMenu}>
          <span className='matched-products-pagination__selected'>{pageSize} позиций</span>
          <div className={`matched-products-pagination__caret`}></div>
        </div>
        <ul
          className={`matched-products-pagination__dropdown-menu ${selectMenuIsOpen && 'matched-products-pagination__dropdown-menu_open'}`}
          onClick={handleSelectOption}>
          <li className='matched-products-pagination__dropdown-item' value={minNumbOfPages}>{minNumbOfPages} позиций</li>
          <li className='matched-products-pagination__dropdown-item' value={middleNumbOfPages}>{middleNumbOfPages} позиций</li>
          <li className='matched-products-pagination__dropdown-item' value={maxNumbOfPages}>{maxNumbOfPages} позиций</li>
        </ul>
      </div>
      <div className='matched-products-pagination__container'>
        <button className='matched-products-pagination__button' disabled={!canPreviousPage}
          onClick={() => {
            gotoPage(0);
            setValue(1);
          }}>
          {'<<'}
        </button>
        <button className='matched-products-pagination__button' disabled={!canPreviousPage}
          onClick={() => {
            previousPage();
            setValue(pageIndex);
          }}>
          Назад
        </button>
        <p className='matched-products-pagination__page-number'>
          {pageIndex + 1} из {pageOptions.length}
        </p>
        <button className='matched-products-pagination__button' disabled={!canNextPage}
          onClick={() => {
            nextPage();
            setValue(pageIndex + 2);
          }}>
          Вперед
        </button>
        <button className='matched-products-pagination__button' disabled={!canNextPage}
          onClick={() => {
            gotoPage(pageCount - 1)
            setValue(pageCount);
          }}>
          {'>>'}
        </button>
      </div>
      <div className='matched-products-pagination__number'>
        <button className='matched-products-pagination__decrement' onClick={handleClickDecrement}> - </button>
        <input type='number' className='matched-products-pagination__number-input'
          value={value || ''}
          min='0'
          step='1'
          onChange={e => {
            handleChangeInput(e);
          }} />
        <button className='matched-products-pagination__increment' onClick={handleClickIncrement}> + </button>
      </div>
    </div>
  )
};

export default MatchedProductsPagination;
