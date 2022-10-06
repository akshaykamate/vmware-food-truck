import React from 'react'
import Link from 'next/link'
import { createPopper } from '@popperjs/core'

const PagesDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false)
  const btnDropdownRef = React.createRef()
  const popoverDropdownRef = React.createRef()
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start'
    })
    setDropdownPopoverShow(true)
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false)
  }
  return (
    <>
      <a
        className='lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
        href='#pablo'
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault()
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
        }}>
        Demo Pages
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }>
        <span
          className={
            'text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400'
          }>
          Admin Pages
        </span>
        <Link href='/'>
          <a
            href='#pablo'
            className={
              'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
            }>
            Dashboard
          </a>
        </Link>
        <div className='h-0 mx-4 my-2 border border-solid border-blueGray-100' />
        <span
          className={
            'text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400'
          }>
          Food Truck Pages
        </span>
        <Link href='/food-trucks'>
          <a
            href='#pablo'
            className={
              'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
            }>
            Monthly View
          </a>
        </Link>
        <Link href='/food-trucks/create'>
          <a
            href='#pablo'
            className={
              'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
            }>
            Create
          </a>
        </Link>
      </div>
    </>
  )
}

export default PagesDropdown
