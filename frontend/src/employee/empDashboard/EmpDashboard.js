import React from 'react'
import { Outlet } from 'react-router-dom'
import EmpSidebar from './EmpSidebar'
import DeptHeader from '../../shared/DeptHeader'

function EmpDashboard() {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <EmpSidebar />
      </div>
      <div style={{width: '100%'}}>
        <DeptHeader header="Employee Dashboard"/>
         {/* Outlet will render the nested routes here */}
        <Outlet />
      </div>
    </div>
  )
}

export default EmpDashboard