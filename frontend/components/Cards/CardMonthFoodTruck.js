import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import axios from 'axios'

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDay(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

export default function CardMonthFoodTruck({ color }) {
  const [list, setList] = useState([])
  const [date, setDate] = useState(formatDate(new Date()))
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  useEffect(() => {
    var config = {
      method: 'get',
      url:
        'http://localhost:3001/api/v1/food-trucks?date=' + date + '&month=true',
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
                  setDate(
                    formatDate(
                      new Date(
                        newDate.getFullYear(),
                        newDate.getMonth() - 1,
                        10
                      )
                    )
                  )
                }}>
                <i className='fas fa-arrow-left'></i> prev
              </button>
              <h3
                className={
                  'font-semibold text-lg ' +
                  (color === 'light' ? 'text-blueGray-700' : 'text-white')
                }>
                {month[new Date(date).getMonth()]}{' '}
                {new Date(date).getFullYear()}
              </h3>
              <button
                className='bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => {
                  const newDate = new Date(date)
                  setDate(
                    formatDate(
                      new Date(
                        newDate.getFullYear(),
                        newDate.getMonth() + 1,
                        10
                      )
                    )
                  )
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
            <table className='items-center w-full bg-transparent border-collapse'>
              <thead>
                <tr>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                    }>
                    Name
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                    }>
                    Date
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                    }>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={index}>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                      {item.name}
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                      {new Date(item.date).toLocaleString('en', {
                        timeZone: 'Asia/Calcutta'
                      })}
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                      <Link href={`/food-trucks/${item.id}/edit`}>Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}

CardMonthFoodTruck.defaultProps = {
  color: 'light'
}

CardMonthFoodTruck.propTypes = {
  color: PropTypes.oneOf(['light', 'dark'])
}
