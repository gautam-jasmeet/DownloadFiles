import {useEffect, useState} from 'react'
import axios from 'axios'

function RecentFiles() {
    const [recentFiles, setRecentFiles] = useState([])

    useEffect(()=>{
        
        
        const fetchRecentFiles = async () => {
            try{
            const response = await axios.get("http://localhost:8080/recent-files")
            setRecentFiles(response.data)
        }
    catch(err){
        console.error('Error fetching recent files', err);

    }
}

fetchRecentFiles()

    },[])

  return (
    <div>
         <div>
      <h2>Recently Added Files</h2>
      <ul>
        {recentFiles.map(file => (
          <li key={file._id}>{file.filename} - {new Date(file.createdAt).toLocaleString()}</li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default RecentFiles