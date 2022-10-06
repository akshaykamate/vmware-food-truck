import React from 'react'
import Router from 'next/router'
import { Formik } from 'formik'
import axios from 'axios'

import Auth from 'layouts/Auth.js'

export default function Register() {
  return (
    <>
      <div className='container mx-auto px-4 h-full'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-6/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
              <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                <div className='text-blueGray-400 text-center mb-3 font-bold'>
                  <small>Sign up with credentials</small>
                </div>
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validate={(values) => {
                    const errors = {}
                    if (!values.email) {
                      errors.email = 'Required'
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = 'Invalid email address'
                    }
                    return errors
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    axios
                      .post('http://localhost:3001/api/v1/auth/signup', values)
                      .then((res) => {
                        if (res.data.status) {
                          Router.push('/auth/login')
                        }
                      })
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
                          placeholder='Name'
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
                          Email
                        </label>
                        <input
                          type='email'
                          name='email'
                          className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                          placeholder='Email'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {errors.email && touched.email && errors.email}
                      </div>

                      <div className='relative w-full mb-3'>
                        <label
                          className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                          htmlFor='grid-password'>
                          Password
                        </label>
                        <input
                          type='password'
                          name='password'
                          className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                          placeholder='Password'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                      </div>
                      <div>
                        <label className='inline-flex items-center cursor-pointer'>
                          <input
                            id='customCheckLogin'
                            type='checkbox'
                            className='form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150'
                          />
                          <span className='ml-2 text-sm font-semibold text-blueGray-600'>
                            I agree with the{' '}
                            <a
                              href='#pablo'
                              className='text-lightBlue-500'
                              onClick={(e) => e.preventDefault()}>
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      </div>
                      <div className='text-center mt-6'>
                        <button
                          className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                          type='submit'
                          disabled={isSubmitting}>
                          Create Account
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Register.layout = Auth
