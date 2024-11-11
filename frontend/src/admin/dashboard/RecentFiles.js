import {useEffect, useState,useContext} from 'react'
import axios from 'axios'
import ViewFiles from './ViewFiles'
import { AppContext } from '../../appContext/AppContext'
import "./ViewFiles.css"

function RecentFiles({refresh}) {
    const [recentFiles, setRecentFiles] = useState([]);
    const [ message, setMessage ] = useState('');
    // const [status, setStatus] = useState('')

    const {token} = useContext(AppContext)

    useEffect(()=>{
        const fetchRecentFiles = async () => {
            try{
            const response = await axios.get("http://srv617987.hstgr.cloud:8080/documents/",{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            // console.log(response.data);
             // Check if response.data is an array before setting it
        if (Array.isArray(response.data)) {
          setRecentFiles(response.data.reverse());  
          // console.log(recentFiles);
        } else {
            setRecentFiles([]); // Fallback if it's not an array
          }
            
            // setRecentFiles(response.data)
        }
    catch(err){
        setMessage('Error fetching recent files', err);
    }
}
fetchRecentFiles()

    },[token,refresh])

    // console.log(recentFiles);
    
// Changing the document status
    const changeDocumentStatus = async (documentId, status) => {
      try{
        const response = await axios.put(`http://srv617987.hstgr.cloud:8080/documents/${documentId}`, {status: status},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        // console.log(response.data);

        if(response.status === 200){
          setMessage("Document status updated successfully")

          //  // Filter out the updated file from the recent files list
          const updatedFiles = recentFiles.filter((file)=>{
              return file.id !== documentId;
          })
        setRecentFiles(updatedFiles)
          
        }
          
    }catch(err){
        setMessage('Error updating document status', err);
    }

  }

  const handleApprove =(documentId)=>{
    changeDocumentStatus(documentId, 'Approved')
  }

  const handleReject = async (documentId)=>{
    // changeDocumentStatus(documentId, 'Rejected')
   
          const confirmation = window.confirm(`Are you sure you want to reject this document?
             This will also delete the document from the server. Proceed?`);
          if(!confirmation){
            return;
          }
          try {
            const response = await axios.delete(`http://srv617987.hstgr.cloud:8080/documents/${documentId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            
      
            if (response.status === 200) {
               // Filter out the deleted document immediately in the state
              setRecentFiles((prevDocs) => prevDocs.filter((doc) => doc.id !== documentId));
              setMessage('Document deleted successfully');
            } else {
              setMessage('Failed to delete document');
            }
          } catch (err) {
            console.error('Error deleting document:', err);
            setMessage(`Failed to delete document: ${err.message}`);
          }
        
  }


  return (
    <div>
         <div>
      <h3 
      style={{fontSize:"1.7rem", fontWeight:"bold", color:"var(--primary-color)", margin:"10px",
         marginBottom:"10px"}}
      > <span className='border-bottom border-2 '>Recently Added Files <i class="bi bi-reception-0"></i> </span> </h3>
      <ul className="list-group" >
        {message && <p>{message}</p>}
        {recentFiles.filter((file)=>file.status !== "Approved" && file.status !== "Rejected")
         .map(file => (
          <li key={file.id}  style={{ marginTop: '20px', }}>
             <div className="card m-2 w-75" style={{ border: '1px solid var(--primary-color)',
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
            <p className="card-text" style={{margin:"0"}}>
              <b>File Number: </b> {file.fileNo}
            </p>
            <p className="card-text">
              <b> Uploaded On:</b>  {new Date(file.createdAt).toLocaleString()}
            </p>
          </div>
             <div >
            <label><b>Status: </b></label>
            {file.status === "Approved" || file.status === "Rejected" ? (<span> {file.status}</span>) : (
              <div style={{ display: 'flex' ,flexWrap:"wrap" ,width:"75%"}}>
              <button className="btn btn-primary  card_btn " onClick={() => handleApprove(file.id)}>Approve</button>
           <button className="btn btn-primary  card_btn " onClick={() => handleReject(file.id)}>Reject</button>
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