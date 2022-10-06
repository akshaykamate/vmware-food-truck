import React, { useEffect } from 'react'
import Router from 'next/router'

import Admin from 'layouts/Admin.js'
import CardDayFoodTruck from 'components/Cards/CardDayFoodTruck.js'

export default function Dashboard() {
  useEffect(() => {
    let token = sessionStorage.getItem('token')
    if (!token || token === '') {
      Router.push('/auth/login')
      return
    }
  }, [])
  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full xl:w-12/12 mb-12 xl:mb-0 px-4'>
          <CardDayFoodTruck />
        </div>
      </div>
    </>
  )
}
Dashboard.layout = Admin
