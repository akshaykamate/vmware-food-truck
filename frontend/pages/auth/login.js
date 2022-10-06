import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Formik } from 'formik'
import axios from 'axios'

import Auth from 'layouts/Auth.js'

export default function Login() {
  return (
    <>
      <div className='container mx-auto px-4 h-full'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-4/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
              <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                <div className='text-blueGray-400 text-center mb-3 font-bold'>
                  <small>Sign in with credentials</small>
                </div>
                <Formik
                  initialValues={{ name: '', email: '', password: '' }}
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
                      .post('http://localhost:3001/api/v1/auth/login', values)
                      .then((res) => {
                        if (res.data.status) {
                          sessionStorage.setItem('token', res.data.token)
                          Router.push('/')
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
                      <div className='text-center mt-6'>
                        <button
                          className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                          type='submit'
                          disabled={isSubmitting}>
                          Sign In
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
            <div className='flex flex-wrap mt-6 relative'>
              <div className='w-1/2'>
                <a
                  href='#pablo'
                  onClick={(e) => e.preventDefault()}
                  className='text-blueGray-200'>
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className='w-1/2 text-right'>
                <Link href='/auth/register'>
                  <a href='#pablo' className='text-blueGray-200'>
                    <small>Create new account</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Login.layout = Auth
