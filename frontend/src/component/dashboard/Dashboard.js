import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import RecentFilesContext from '../../context/RecentFilesContext';
import HrHomePage from '../../departments/hrDpartment/HrHomePage';
import ItHomePage from '../../departments/it/ItHomePage';
import MarketingHP from '../../departments/marketing/MarketingHP';
import SaleHP from '../../departments/sales/SaleHP';

function Dashboard() {
  const {recentFiles} = useContext(RecentFilesContext);
  return (
    <>
      <div>
        <Sidebar />
      </div>
      <div style={{marginLeft:"220px", padding:"20px" }}>
                <div>
                    <h3>Recently Added Files</h3>
                    <ul>
                        {recentFiles.map((file, index) => (
                            <li key={index}>{file.name} uploaded on {file.timestamp.toLocaleString()}</li>
                        ))}
                    </ul>
                </div>

            </div>
          </>
  )
}

export default Dashboard