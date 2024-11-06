import React from 'react'
import { Outlet } from 'react-router-dom'
import EmpSidebar from './EmpSidebar'
import DeptHeader from '../../shared/DeptHeader'

function EmpDashboard() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '15%' }}>
        <EmpSidebar />
      </div>
      <div style={{width: '85%'}}>
        {/* <DeptHeader header="Employee "/> */}
         {/* Outlet will render the nested routes here */}
        <Outlet />
      </div>
    </div>
  )
}

export default EmpDashboard