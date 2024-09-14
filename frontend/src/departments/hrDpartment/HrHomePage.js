import React from 'react'

import FileUpload from '../sharedDept/FileUpload'
import DeptHeader from '../../shared/DeptHeader'

function HrHomePage() {
  return (
    <div>
        <DeptHeader header="HR Department" />
        <FileUpload/>
    </div>
  )
}

export default HrHomePage