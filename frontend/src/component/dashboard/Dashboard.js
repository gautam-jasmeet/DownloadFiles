import React, { useContext } from 'react'
import Sidebar from './Sidebar';
import RecentFilesContext from '../../context/RecentFilesContext';
import RecentFiles from './RecentFiles';

function Dashboard() {
  // const {recentFiles} = useContext(RecentFilesContext);
  return (
    <>
      <div>
        <Sidebar />
      </div>
      <div style={{marginLeft:"220px", padding:"20px" }}>
        <RecentFiles />
      </div>
      {/* <div style={{marginLeft:"220px", padding:"20px" }}>
                <div>
                    <h3>Recently Added Files</h3>
                    <ul>
                        {recentFiles.map((file, index) => (
                            <li key={index}>{file.name} uploaded on {file.timestamp.toLocaleString()}</li>
                        ))}
                    </ul>
                </div>

            </div> */}
          </>
  )
}

export default Dashboard