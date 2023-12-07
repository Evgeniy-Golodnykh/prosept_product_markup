import { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table';

import './DealerProductTable.css';

import {
  nameOfProduct,
  recordingDate,
  seller,
  selectProduct,
  article,
  price,
  status,
} from '../../../utils/constants';

import DealerGlobalFilter from '../DealerGlobalFilter/DealerGlobalFilter';
import DealerColumnFilter from '../DealerColumnFilter/DealerColumnFilter';
import DealerPagination from '../DealerPagination/DealerPagination';
import DealerRadioButton from '../DealerRadioButton/DealerRadioButton';

const COLUMNS = [
  {
    Header: selectProduct,
    disableFilters: true,
    Cell: (props) => {
      return (
        <DealerRadioButton
          rowStatus={props.row.values.status}
          rowId={props.row.values.product_key}
          getRecomendationToDealerProduct={props.getRecomendationToDealerProduct}
          pendingDealersProducts={props.pendingDealersProducts}
          setIsPostponed={props.setIsPostponed}
        />
      )
    },
    disableSortBy: true,
  },
  {
    Header: article,
    accessor: 'product_key',
    enableHiding: false,
    disableFilters: true,
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
    disableFilters: true,
  },
]

function DealerProductTable(props) {

  const defaultColumn = useMemo(() => {
    return {
      Filter: DealerColumnFilter
    }
  }, []);

  const tableInstance = useTable({
    columns: COLUMNS,
    data: props.pendingDealersProducts,
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
    <>
      <DealerGlobalFilter filterValue={globalFilter} setFilterValue={setGlobalFilter} />
      <table className='dealer-table' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className='dealer-table__row' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className='dealer-table__header-cell' {...column.getHeaderProps()}>
                  <div className='dealer-table__container'>
                    <div {...column.getSortByToggleProps()} className='dealer-table__sort-header'>
                      <p className='dealer-table__sort-title'>{column.render('Header')}</p>
                      <p className='dealer-table__sorted-icon'>
                        {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
                      </p>
                    </div>
                    <div>
                      {column.canFilter ? column.render('Filter', { dealers: props.dealers }) : null}
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
                    return <td className='dealer-table__cell'
                      {...cell.getCellProps()}>
                      {cell.render('Cell',
                        {
                          getRecomendationToDealerProduct: props.getRecomendationToDealerProduct,
                          pendingDealersProducts: props.pendingDealersProducts,
                          setIsPostponed: props.setIsPostponed
                        })}
                    </td>
                  })
                }
              </tr>
            )
          })}
        </tbody>

      </table>
      <DealerPagination
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
  )
};

export default DealerProductTable;
