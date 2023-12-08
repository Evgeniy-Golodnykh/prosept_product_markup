import { useMemo } from 'react';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';

import './GeneralAnalyticsTable.css';

import {
  nameOfProduct,
  recordingDate,
  seller,
  price,
  status,
  article,
} from '../../../utils/constants';

import GeneralAnalyticsPagination from '../GeneralAnalyticsPagination/GeneralAnalyticsPagination';
import GeneralAnalyticsFilter from '../GeneralAnalyticsFilter/GeneralAnalyticsFilter';
import Preloader from '../../Preloader/Preloader';

const COLUMNS = [
  {
    Header: article,
    accessor: 'product_key',
  },
  {
    Header: nameOfProduct,
    accessor: 'product_name',
    Cell: ({ row }) =>
      <a
        className='dealer-table__product-link'
        href={row.original.product_url}
        target="_blank" rel="noreferrer">
        {row.values.product_name}
      </a>
  },
  {
    Header: price,
    accessor: 'price',
    disableFilters: true,
  },
  {
    Header: seller,
    accessor: 'dealer_name',
    disableSortBy: true,
  },
  {
    Header: recordingDate,
    accessor: 'date',
    disableFilters: true,
  },
  {
    Header: status,
    accessor: 'status',
    disableSortBy: true,
  },
]

function GeneralAnalyticsTable({ dealers, dealersProducts, setSelectedDealer, isLoadingGeneralAnalytics }) {

  const defaultColumn = useMemo(() => {
    return {
      Filter: GeneralAnalyticsFilter
    }
  }, []);

  const tableInstance = useTable({
    columns: COLUMNS,
    data: dealersProducts,
    defaultColumn: defaultColumn,
  }, useFilters, useSortBy, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  return (
    <div className='general-analytics-table__wrapper'>
      <h2 className='general-analytics-table__title'>Отчет по товарам дилеров</h2>
      {isLoadingGeneralAnalytics
        ? <Preloader />
        : <>
          <table className='general-analytics-table' {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr className='general-analytics-table__row' {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th className='general-analytics-table__header-cell' {...column.getHeaderProps()}>
                      <div className='general-analytics-table__container'>
                        <div {...column.getSortByToggleProps()} className='general-analytics-table__sort-header'>
                          <div className='general-analytics-table__sort-title'>{column.render('Header')}</div>
                          <p className='general-analytics-table__sorted-icon'>
                            {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
                          </p>
                        </div>
                        <div>
                          {column.canFilter ? column.render('Filter', { setSelectedDealer: setSelectedDealer, dealers: dealers }) : null}
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
                        return <td className='general-analytics-table__cell' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })
                    }
                  </tr>
                )
              })}
            </tbody>
          </table>
          <GeneralAnalyticsPagination
            pageIndex={pageIndex}
            pageOptions={pageOptions}
            gotoPage={gotoPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            nextPage={nextPage}
            previousPage={previousPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageCount={pageCount}
          />
        </>
      }
    </div>
  )
};

export default GeneralAnalyticsTable;
