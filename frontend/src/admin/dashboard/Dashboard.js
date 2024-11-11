import React, { useState } from 'react'
import { Outlet ,useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import RecentFiles from './RecentFiles';
import AdminFileUpload from './AdminFileUpload';
import Sidebar1 from './Sidebar1';


function Dashboard() {
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();

       // Trigger a refresh of recent files
       const handleRefresh = () => {
         setRefresh(!refresh);
       }

  // Condition to show default components when there's no specific route matched
  const isDefaultRoute = location.pathname === '/Admin'
  return (
    <div style={{display:"flex" }}>
      <div  style={{ width: "15%", height: "calc(100vh - 77px)",
        position:"sticky",top:"60px",zIndex:"999"
      }}>
        <Sidebar />
        {/* <Sidebar1 /> */}
        </div>
        
      <div style={{ height:"100%", width:"85%" }}>
      
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap",width:"100%",}}>
          { isDefaultRoute ? (
            <>
            <div style={{ flex: 1, marginRight: "50px",marginTop:"10px" }}>
        <RecentFiles refresh={refresh}/>
      </div>
      <div style={{ flexShrink: 0 ,position:"sticky", top:"10px"}}>
        <AdminFileUpload onFileUpload={handleRefresh}/>
      </div>
          </>
          ):(
            <Outlet />
          )}
        
        </div>
        
      </div>
     
          </div>
  )
}

export default Dashboard