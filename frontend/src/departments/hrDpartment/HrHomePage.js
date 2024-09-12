import React from 'react'

import FileUpload from '../shared/FileUpload'
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