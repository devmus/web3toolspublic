import React from 'react'
import { Outlet } from 'react-router-dom'

export const Stepn = () => {
  return (
    <div className="stepn-wrapper page-wrapper">
      <Outlet/>
    </div>
  )
}
