import { useState, useRef } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';

import './DealerPagination.css';

function DealerPagination({
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

  const [value, setValue] = useState(pageIndex + 1)
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);
  const dropdownMenuRef = useRef(null);

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
    if (e.target.classList.contains('dealer-pagination__dropdown-item')) {
      setPageSize(e.target.value);
      setSelectMenuIsOpen(!selectMenuIsOpen)
    }
  }

  useOutsideClick(dropdownMenuRef, handleCloseSelectMenu, selectMenuIsOpen)

  return (
    <div className='dealer-pagination'>
      <div className='deler-pagination__dropdown'>
        <div ref={dropdownMenuRef} className='deler-pagination__select' onClick={handleToggleSelectMenu}>
          <span className='deler-pagination__selected'>{pageSize} позиций</span>
          <div className={`deler-pagination__caret`}></div>
        </div>
        <ul
          className={`dealer-pagination__dropdown-menu ${selectMenuIsOpen && 'dealer-pagination__dropdown-menu_open'}`}
          onClick={handleSelectOption}>
          <li className='dealer-pagination__dropdown-item' value='10'>10 позиций</li>
          <li className='dealer-pagination__dropdown-item' value='25'>25 позиций</li>
          <li className='dealer-pagination__dropdown-item' value='50'>50 позиций</li>
        </ul>
      </div>
      <div className='dealer-pagination__container'>
        <button className='dealer-pagination__button' disabled={!canPreviousPage}
          onClick={() => {
            gotoPage(0);
            setValue(1);
          }}>
          {'<<'}
        </button>
        <button className='dealer-pagination__button' disabled={!canPreviousPage}
          onClick={() => {
            previousPage();
            setValue(pageIndex);
          }}>
          Назад
        </button>
        <p className='dealer-pagination__page-number'>
          {pageIndex + 1} из {pageOptions.length}
        </p>
        <button className='dealer-pagination__button' disabled={!canNextPage}
          onClick={() => {
            nextPage();
            setValue(pageIndex + 2);
          }}>
          Вперед
        </button>
        <button className='dealer-pagination__button' disabled={!canNextPage}
          onClick={() => {
            gotoPage(pageCount - 1)
            setValue(pageCount);
          }}>
          {'>>'}
        </button>
      </div>
      <div className='dealer-pagination__number'>
        <button className='dealer-pagination__decrement' onClick={handleClickDecrement}> - </button>
        <input type='number' className='dealer-pagination__number-input'
          value={value || ''}
          min='0'
          step='1'
          onChange={e => {
            handleChangeInput(e);
          }} />
        <button className='dealer-pagination__increment' onClick={handleClickIncrement}> + </button>
      </div>
    </div>
  )
};

export default DealerPagination;
