import React, { useContext } from 'react'
import Sidebar from './Sidebar';
import RecentFilesContext from '../../context/RecentFilesContext';
import RecentFiles from './RecentFiles';
import ViewFiles from './ViewFiles';

function Dashboard() {
  // const {recentFiles} = useContext(RecentFilesContext);
  return (
    <div style={{display:"flex"}}>
      <div>
        <Sidebar />
        </div>
      <div style={{marginLeft:"50px", padding:"10px", height:"100%", width:"100%" }}>
        <RecentFiles />
      </div>
     
          </div>
  )
}

export default Dashboard