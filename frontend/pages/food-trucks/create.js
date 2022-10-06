import React, { useEffect } from 'react'
import Router from 'next/router'

import Admin from 'layouts/Admin.js'
import CardAddFoodTruck from 'components/Cards/CardAddFoodTruck.js'

export default function FoodTrucks() {
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
          <CardAddFoodTruck />
        </div>
      </div>
    </>
  )
}
FoodTrucks.layout = Admin
