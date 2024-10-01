import React from 'react'
import DeptHeader from '../../../shared/DeptHeader'
import HrSidebar from './HrSidebar'

function HrHomePage() {
  return (
    <div style={{ display: 'flex' }}>
    <div >

    <HrSidebar />
    </div>
    <div style={{width: '100%'}}>

      <DeptHeader header="HR Department" />
    </div>

      {/* <FileUpload/> */}
  </div>
  )
}

export default HrHomePage