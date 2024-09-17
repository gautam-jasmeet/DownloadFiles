import React from 'react'
import Sidebar from './Sidebar';
import RecentFiles from './RecentFiles';
import AdminFileUpload from './AdminFileUpload';


function Dashboard() {
  return (
    <div style={{display:"flex"}}>
      <div >
        <Sidebar />
        </div>
      <div style={{marginLeft:"50px", padding:"10px", height:"100%", width:"100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1, marginRight: "50px" }}>
        <RecentFiles />
      </div>
      <div style={{ flexShrink: 0 ,position:"sticky", top:"10px"}}>
        <AdminFileUpload />
      </div>
        </div>
        
      </div>
     
          </div>
  )
}

export default Dashboard