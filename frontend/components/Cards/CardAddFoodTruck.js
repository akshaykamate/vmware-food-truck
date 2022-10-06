import React from 'react'
import { Router } from 'next/router'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import axios from 'axios'

export default function CardAddFoodTruck({ color }) {
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
              <h3
                className={
                  'font-semibold text-lg ' +
                  (color === 'light' ? 'text-blueGray-700' : 'text-white')
                }>
                New Food Truck
              </h3>
            </div>
          </div>
        </div>
        <div className='block w-full overflow-x-auto py-10 px-6'>
          <Formik
            initialValues={{ name: '', date: '' }}
            validate={(values) => {
              const errors = {}
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              var config = {
                method: 'post',
                url: 'http://localhost:3001/api/v1/food-trucks',
                headers: {
                  Authorization: 'Bearer ' + sessionStorage.getItem('token')
                },
                data: values
              }
              axios(config).then(
                (res) => res.data.status && Router.push('/food-trucks')
              )
              setSubmitting(false)
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form onSubmit={handleSubmit}>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    placeholder='Food Truck Name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {errors.name && touched.name && errors.name}
                </div>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'>
                    Date
                  </label>
                  <input
                    type='Date'
                    name='date'
                    className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    placeholder='Date'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                  />
                  {errors.date && touched.date && errors.date}
                </div>
                <div className='text-center mt-6'>
                  <button
                    className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                    type='submit'
                    disabled={isSubmitting}>
                    Submit
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

CardAddFoodTruck.defaultProps = {
  color: 'light'
}

CardAddFoodTruck.propTypes = {
  color: PropTypes.oneOf(['light', 'dark'])
}
