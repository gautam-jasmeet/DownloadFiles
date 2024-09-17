import {useEffect, useState} from 'react'
import axios from 'axios'
import ViewFiles from './ViewFiles'
import "./ViewFiles.css"

function RecentFiles() {
    const [recentFiles, setRecentFiles] = useState([]);
    const [ message, setMessage ] = useState('');
    // const [status, setStatus] = useState('')

    useEffect(()=>{
        const fetchRecentFiles = async () => {
            try{
            const response = await axios.get("http://localhost:8080/documents/",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            })
            console.log(response.data);
             // Check if response.data is an array before setting it
        if (Array.isArray(response.data)) {
          setRecentFiles(response.data);  
        } else {
            setRecentFiles([]); // Fallback if it's not an array
          }
            
            // setRecentFiles(response.data)
        }
    catch(err){
        console.error('Error fetching recent files', err);
    }
}
fetchRecentFiles()

    },[])

    // console.log(recentFiles);
    

    const changeDocumentStatus = async (documentId, status) => {
      try{
        const response = await axios.put(`http://localhost:8080/documents/${documentId}`, {status: status},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        })
        console.log(response.data);

        if(response.status === 200){
          setMessage("Document status updated successfully");
          //   Updating the status in the local state to reflect it in the UI
          const updatedFiles = recentFiles.map((file)=>

            file.id === documentId ? {...file,status:status} : file
        )
        setRecentFiles(updatedFiles)
          
        }
          
    }catch(err){
        setMessage('Error updating document status', err);
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
      <h3
      style={{fontSize:"1.7rem", fontWeight:"bold", color:"#333",
         marginBottom:"10px", position:"sticky", top:"4rem", zIndex:"999"}}
      >Recently Added Files :</h3>
      <ul className="list-group" >
        {recentFiles.map(file => (
          <li key={file.id}  style={{ marginTop: '20px', }}>
             <div className="card w-75" style={{ border: '1px solid var(--primary-color)',
             borderRadius: '15px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              backgroundColor:"f9f9f9"  }}>
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
              <button className="btn btn-primary  card_btn" onClick={() => handleApprove(file.id)}>Approve</button>
           <button className="btn btn-primary  card_btn" onClick={() => handleReject(file.id)}>Rejected</button>
           <ViewFiles file={file} />
           </div>
            )}
            {message && <p>{message}</p>}
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