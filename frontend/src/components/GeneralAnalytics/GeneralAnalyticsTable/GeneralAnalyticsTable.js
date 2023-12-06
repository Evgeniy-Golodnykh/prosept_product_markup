import { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table';

import './GeneralAnalyticsTable.css';

import GeneralAnalyticsFilter from '../GeneralAnalyticsFilter/GeneralAnalyticsFilter';
import GeneralAnalyticsPagination from '../GeneralAnalyticsPagination/GeneralAnalyticsPagination';
import GeneralAnalyticsDropdownMenu from '../GeneralAnalyticsDropdownMenu/GeneralAnalyticsDropdownMenu';

const COLUMNS = [
  {
    Header: 'Наименование товара',
    accessor: 'product_name',
    disableFilters: true,
    Cell: ({ row }) =>
      <a
        className='dealer-table__product-link'
        href={row.original.product_url}
        target="_blank" rel="noreferrer">
        {row.values.product_name}
      </a>
  },
  {
    Header: 'Цена',
    accessor: 'price',
    disableFilters: true,
  },
  {
    Header: 'Продавец',
    accessor: 'dealer_name',
    disableSortBy: true,
  },
  {
    Header: 'Дата записи',
    accessor: 'date',
    disableFilters: true,
  },
  {
    Header: 'Статус сопоставления',
    accessor: 'status',
    disableFilters: true,
  },
]

function GeneralAnalyticsTable({ dealers, dealersProducts, setSelectedDealer }) {

  const defaultColumn = useMemo(() => {
    return {
      Filter: GeneralAnalyticsDropdownMenu
    }
  }, []);

  const tableInstance = useTable({
    columns: COLUMNS,
    data: dealersProducts,
    defaultColumn: defaultColumn,
  }, useFilters, useGlobalFilter, useSortBy, usePagination);

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
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div className='general-analytics-table__wrapper'>
      <h2 className='general-analytics-table__title'>Отчет по товарам дилеров</h2>
      <GeneralAnalyticsFilter filterValue={globalFilter} setFilterValue={setGlobalFilter} />
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
                      {column.canFilter ? column.render('Filter', {setSelectedDealer: setSelectedDealer, dealers: dealers}) : null}
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
    </div>
  )
};

export default GeneralAnalyticsTable;
