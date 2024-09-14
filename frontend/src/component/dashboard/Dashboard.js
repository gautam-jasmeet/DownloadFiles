import React from 'react'
import Sidebar from './Sidebar';
// import RecentFiles from './RecentFiles';


function Dashboard() {
  return (
    <div style={{display:"flex"}}>
      <div >
        <Sidebar />
        </div>
      <div style={{marginLeft:"50px", padding:"10px", height:"100%", width:"100%" }}>
        {/* <RecentFiles /> */}
      </div>
     
          </div>
  )
}

export default Dashboard