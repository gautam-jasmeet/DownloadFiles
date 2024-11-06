import React from 'react'
import { Outlet } from 'react-router-dom'
import DeptHeader from '../../../shared/DeptHeader'
import HrSidebar from './HrSidebar'
// import JoiningForm1 from '../JoiningForm/JoiningForm1'

function HrHomePage() {
  return (
    <div style={{ display: 'flex' }}>

    <div style={{ width: '15%',position:"relative" }}>
    <HrSidebar />
    </div>

    <div style={{width: '85%'}}>
      {/* <DeptHeader header="HR Department" /> */}
      
      <Outlet />
    </div>

      {/* <FileUpload/> */}
  </div>
  )
}

export default HrHomePage