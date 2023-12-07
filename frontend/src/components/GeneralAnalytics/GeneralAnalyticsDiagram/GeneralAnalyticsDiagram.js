import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'

import './GeneralAnalyticsDiagram.css';

function GeneralAnalyticsDiagram({ dealersProducts, selectedDealer }) {

  const [valueYes, setValueYes] = useState('')
  const [valueNo, setValueNo] = useState('')
  const [valueNotReviewed, setValueNotReviewed] = useState('')

  function getStatusValues(arr) {
    const valueYes = arr.filter((obj) => obj.status === 'Да').length;
    setValueYes(valueYes)
    const valueNo = arr.filter((obj) => obj.status === 'Нет').length;
    setValueNo(valueNo)
    const valueNotReviewed = arr.filter((obj) => obj.status === 'Не рассмотрен').length;
    setValueNotReviewed(valueNotReviewed)
  }

  useEffect(() => {
    if (selectedDealer === null) {
      getStatusValues(dealersProducts);
    } else {
      const newArr = dealersProducts.filter((obj) => obj.dealer_name === selectedDealer);
      getStatusValues(newArr)
    }
  }, [selectedDealer, dealersProducts])


  return (
    <div className="general-analytics-diagram">
      <h2 className='general-analytics-diagram___title'>Аналитика</h2>
      <div className='general-analytics-diagram__container'>
        <Chart
          options={
            {
              labels: ['Да', 'Нет', 'Не рассмотрен'],
              legend: {
                position: 'bottom',
                fontSize: '14px'
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      total: {
                        show: true,
                        label: 'Всего',
                        color: '#333'
                      }
                    }

                  }
                }
              },
            }
          }
          series={[valueYes, valueNo, valueNotReviewed]}
          type="donut"
          width="400"
        />
      </div>
    </div>
  )
}

export default GeneralAnalyticsDiagram
