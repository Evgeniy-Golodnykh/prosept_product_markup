import { useState, useEffect } from 'react';
import { useAsyncDebounce } from 'react-table';

import './GeneralAnalyticsFilter.css';

function GeneralAnalyticsFilter({ filterValue, setFilterValue }) {
  const [value, setValue] = useState(filterValue)

  const onChange = useAsyncDebounce(value => {
    setFilterValue(value || undefined)
    localStorage.setItem('generalAnalyticsGlobalFilter', value);
  }, 300)

  useEffect(() => {
    const localValue = localStorage.getItem('generalAnalyticsGlobalFilter')
    if (localValue) {
      setValue(localValue);
      setFilterValue(localValue);
    }
  }, [filterValue, setFilterValue])

  return (
    <form className='general-analytics-filter' >
      <input
        className='general-analytics-filter__input'
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

export default GeneralAnalyticsFilter;
