import {useEffect, useState} from 'react'
import axios from 'axios'
import ViewFiles from './ViewFiles'

function RecentFiles() {
    const [recentFiles, setRecentFiles] = useState([])
    // const [status, setStatus] = useState('')

    useEffect(()=>{
        const fetchRecentFiles = async () => {
            try{
            const response = await axios.get("http://localhost:8080/recent-files")
            console.log(response.data);
            
            setRecentFiles(response.data)
        }
    catch(err){
        console.error('Error fetching recent files', err);
    }
}
fetchRecentFiles()

    },[])

    console.log(recentFiles);
    

    const changeDocumentStatus = async (documentId, status) => {
      try{
        const response = await axios.put(`http://localhost:8080/documents/${documentId}`, {status: status})
        console.log(response.data);

        if(response.status === 200){
          console.log("Document status updated successfully");
          //   Updating the status in the local state to reflect it in the UI
          const updatedFiles = recentFiles.map((file)=>

            file._id === documentId ? {...file,status:status} : file
        )
        setRecentFiles(updatedFiles)
          
        }
          
    }catch(err){
        console.error('Error updating document status', err);
    }

  }

  const handleApprove =(documentId)=>{
    changeDocumentStatus(documentId, 'Approved')
  }

  const handleReject = (documentId)=>{
    changeDocumentStatus(documentId, 'Rejected')
  }


  return (
    <div>
         <div>
      <h3>Recently Added Files :</h3>
      <ul className="list-group">
        {recentFiles.map(file => (
          <li key={file._id}  style={{ marginTop: '20px' }}>
             <div className="card w-50" style={{ borderRadius: '15px' }}>
             <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
            <p className="card-text">
              <b>File Name: </b> {file.filename}
            </p>
            <p className="card-text" style={{margin:"0"}}>
              <b>Department: </b> {file.department}
            </p>
            <p className="card-text" style={{margin:"0"}}>
              <b>File Version: </b> {file.fileVersion}
            </p>
            <p className="card-text">
              <b> Uploaded On:</b>  {new Date(file.createdAt).toLocaleString()}
            </p>
          </div>
             <div >
            <label><b>Status: </b></label>
            {file.status === "Approved" || file.status === "Rejected" ? (<span> {file.status}</span>) : (
              <div style={{ display: 'flex' }}>
              <button className="btn btn-primary ms-1" onClick={() => handleApprove(file._id)}>Approve</button>
           <button className="btn btn-primary ms-1" onClick={() => handleReject(file._id)}>Rejected</button>
           <ViewFiles file={file} />
           </div>
            )}
          </div>
          </div>
          </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default RecentFiles