import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'

import './GeneralAnalyticsDiagram.css';

import Preloader from '../../Preloader/Preloader';

function GeneralAnalyticsDiagram({ dealersProducts, selectedDealer, isLoadingGeneralAnalytics }) {

  const [valueYes, setValueYes] = useState('')
  const [valueNo, setValueNo] = useState('')
  const [valueNotReviewed, setValueNotReviewed] = useState('')
  const [valuePostponed, setValuePostponed] = useState('');

  function getStatusValues(arr) {
    const valueYes = arr.filter((obj) => obj.status === 'Да').length;
    setValueYes(valueYes)
    const valueNo = arr.filter((obj) => obj.status === 'Нет').length;
    setValueNo(valueNo)
    const valueNotReviewed = arr.filter((obj) => obj.status === 'Не рассмотрен').length;
    setValueNotReviewed(valueNotReviewed)
    const valuePostponed = arr.filter((obj) => obj.status === 'Отложено').length;
    setValuePostponed(valuePostponed)
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
      <h2 className='general-analytics-diagram___title'>Аналитика по дилерам</h2>
      {isLoadingGeneralAnalytics
        ? <Preloader />
        : <div className='general-analytics-diagram__container'>
          <Chart
            options={
              {
                labels: ['Да', 'Нет', 'Не рассмотрен', 'Отложено'],
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
            series={[valueYes, valueNo, valueNotReviewed, valuePostponed]}
            type="donut"
            width="370"
          />
        </div>
      }
    </div>
  )
}

export default GeneralAnalyticsDiagram
