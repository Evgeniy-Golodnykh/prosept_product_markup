import { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';

import './ManufacturerProductForm.css';

import {
  selectProduct,
  article,
  nameOfProduct,
  price,
} from '../../../utils/constants';

import ManufacturerRadioButton from '../ManufacturerRadioButton/ManufacturerRadioButton';

const COLUMNS = [
  {
    Header: selectProduct,
    Cell: (props) => {
      return (
        <ManufacturerRadioButton
          rowId={props.row.original.id}
          rowIndex={props.row.index}
          getRadioValue={props.getRadioValue}
          setRadioButtonIsSelected={props.setRadioButtonIsSelected}
          radioButtonIsSelected={props.radioButtonIsSelected}
          getMatchingPos={props.getMatchingPos}
        />
      )
    },
    disableSortBy: true,
  },
  {
    Header: article,
    accessor: 'article',
  },
  {
    Header: nameOfProduct,
    accessor: 'name',
  },
  {
    Header: price,
    accessor: 'cost',
  },
]

function ManufacturerProductForm(props) {

  const [value, setValue] = useState(null);
  const [radioButtonIsSelected, setRadioButtonIsSelected] = useState(null);
  const [matchingPos, setMatchingPos] = useState(null);

  useEffect(() => {
    setRadioButtonIsSelected(null)
  }, [props.recommendation])

  const columns = useMemo(() => COLUMNS, []);

  const tableInstance = useTable({
    columns: columns,
    data: props.recommendation,
  }, useSortBy, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = tableInstance;

  function getRadioValue(value) {
    setValue(value)
  }

  function getMatchingPos(matchingPos) {
    setMatchingPos(matchingPos);
  }

  function handleSubmit(event) {
    getRadioValue()
    event.preventDefault()
    props.onComparePosition(value, matchingPos)
  }

  function handleNotComparePosition() {
    props.onNotComparePosition(value)
  }

  function handlePostponePosition() {
    props.onPostonePosition(value)
  }

  return (
    <form className='manufacturer-product-form' onSubmit={handleSubmit}>
      <table className='manufacturer-table' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className='manufacturer-table__row' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className='manufacturer-table__header-cell' {...column.getHeaderProps()}>
                  <div className='manufacturer-table__container'>
                    <div {...column.getSortByToggleProps()} className='manufacturer-table__sort-header'>
                      <p className='manufacturer-table__sort-title'>{column.render('Header')}</p>
                      <p className='manufacturer-table__sorted-icon'>
                        {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
                      </p>
                    </div>
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {
                  row.cells.map((cell) => {
                    return <td className='manufacturer-table__cell' {...cell.getCellProps()}>
                      {cell.render('Cell', {
                        getRadioValue: getRadioValue,
                        setRadioButtonIsSelected: setRadioButtonIsSelected,
                        radioButtonIsSelected: radioButtonIsSelected,
                        getMatchingPos: getMatchingPos,
                      })}
                    </td>
                  })
                }
              </tr>
            )
          })}
        </tbody>
      </table>
      {props.recommendation.length > 1 &&
        (
          <div className="manufacturer-buttons">
            <button
              className={`manufacturer-button ${!radioButtonIsSelected ? 'manufacturer-button_disabled' : 'manufacturer-button_enabled'}`}
              type='submit'
              disabled={!radioButtonIsSelected}>
              Да
            </button>
            <button
              className='manufacturer-button manufacturer-button_enabled'
              type='button'
              onClick={handleNotComparePosition}>
              Нет
            </button>
            <button
              className={`manufacturer-button ${props.isPostponed === 'Отложено' ? 'manufacturer-button_disabled' : 'manufacturer-button_enabled'}`}
              type='button'
              onClick={handlePostponePosition}
              disabled={props.isPostponed === 'Отложено'}>
              Отложить
            </button>
          </div>
        )
      }
      <p className='manufacturer-table__popup-msg'>{props.popup && `${props.popup}`}</p>
      <p className='manufacturer-table__popup-msg error-msg'>{props.error && `${props.error}`}</p>
    </form>
  )
};

export default ManufacturerProductForm;
