import React, { useEffect } from 'react'
import Router, { useRouter } from 'next/router'

import Admin from 'layouts/Admin.js'
import CardEditFoodTruck from 'components/Cards/CardEditFoodTruck.js'

export default function FoodTrucks() {
  const router = useRouter()
  const { id } = router.query

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
          <CardEditFoodTruck id={id} />
        </div>
      </div>
    </>
  )
}
FoodTrucks.layout = Admin
