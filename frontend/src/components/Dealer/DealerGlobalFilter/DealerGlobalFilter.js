import { useState, useEffect } from 'react';
import { useAsyncDebounce } from 'react-table';

import './DealerGlobalFilter.css';

function DealerGlobalFilter({ filterValue, setFilterValue }) {
  const [value, setValue] = useState(filterValue)

  const onChange = useAsyncDebounce(value => {
    setFilterValue(value || undefined)
    localStorage.setItem('dealerGlobalFilter', value);
  }, 300)

  useEffect(() => {
    const localValue = localStorage.getItem('dealerGlobalFilter')
    if (localValue) {
      setValue(localValue);
      setFilterValue(localValue);
    }
  }, [filterValue, setFilterValue])

  return (
    <form className='dealer-global-filter' >
      <input
        className='dealer-global-filter__input'
        type='text'
        placeholder='Глобальный поиск'
        autoComplete="off"
        value={value || ''}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }} />
    </form>
  )
};

export default DealerGlobalFilter;
