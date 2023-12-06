import React from 'react';

import './DealerColumnFilter.css';

function DealerColumnFilter({ column }) {

  const { filterValue, setFilter } = column;

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
};

export default DealerColumnFilter;
