import React, { useState } from 'react'
// import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import RecentFiles from './RecentFiles';
import AdminFileUpload from './AdminFileUpload';


function Dashboard() {
  const [refresh, setRefresh] = useState(false);

       // Trigger a refresh of recent files
       const handleRefresh = () => {
         setRefresh(!refresh);
       }

  return (
    <div style={{display:"flex" }}>
      <div  style={{ width: "15%"}}>
        <Sidebar />
        </div>
        
      <div style={{ height:"100%", width:"85%" }}>
        {/* <Outlet /> */}
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap",width:"100%",padding:"2rem"}}>
        <div style={{ flex: 1, marginRight: "50px" }}>
        <RecentFiles refresh={refresh}/>
      </div>
      <div style={{ flexShrink: 0 ,position:"sticky", top:"10px"}}>
        <AdminFileUpload onFileUpload={handleRefresh}/>
      </div>
        </div>
        
      </div>
     
          </div>
  )
}

export default Dashboard