import React from 'react'
import { Outlet } from 'react-router-dom'
import QualitySidebar from './QualitySidebar'
import DeptHeader from '../../../shared/DeptHeader'

function QualityDashboard() {
  return (
    <div style={{ display: 'flex' }}>

    <div style={{ width: '15%',position:"relative" }}>
    <QualitySidebar />
    </div>

    <div style={{width: '85%'}}>
      <DeptHeader header="Quality Department" />
      
      <Outlet />
    </div>

      {/* <FileUpload/> */}
  </div>
  )
}

export default QualityDashboard