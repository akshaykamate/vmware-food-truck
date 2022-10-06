import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

export default function CardDayFoodTruck({ color }) {
  const [list, setList] = useState([])
  const [date, setDate] = useState(formatDate(new Date()))

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://localhost:3001/api/v1/food-trucks?date=' + date,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    }
    axios(config)
      .then((res) => setList(res.data.data))
      .catch((e) => console.error(e))
  }, [date])

  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
          (color === 'light' ? 'bg-white' : 'bg-blueGray-700 text-white')
        }>
        <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex flex-1 justify-between'>
              <button
                className='bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                onClick={() => {
                  const newDate = new Date(date)
                  newDate.setDate(newDate.getDate() - 1)
                  setDate(formatDate(newDate))
                }}>
                <i className='fas fa-arrow-left'></i> prev
              </button>
              <h3
                className={
                  'font-semibold text-lg ' +
                  (color === 'light' ? 'text-blueGray-700' : 'text-white')
                }>
                {date}
              </h3>
              <button
                className='bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => {
                  const newDate = new Date(date)
                  newDate.setDate(newDate.getDate() + 1)
                  setDate(formatDate(newDate))
                }}>
                {' '}
                next <i className='fas fa-arrow-right'></i>
              </button>
            </div>
          </div>
        </div>
        <div className='block w-full overflow-x-auto py-10 px-6'>
          {list.length === 0 && (
            <h1 className='text-center'> No Food truck for today</h1>
          )}
          {list.length > 0 && (
            <ul>
              {list.map((item, index) => (
                <li className='text-6x font-bold' key={index}>
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

CardDayFoodTruck.defaultProps = {
  color: 'light'
}

CardDayFoodTruck.propTypes = {
  color: PropTypes.oneOf(['light', 'dark'])
}
