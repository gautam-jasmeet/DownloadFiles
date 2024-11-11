import React, {  useEffect, useState,useContext } from 'react';
import axios from 'axios';
import ViewFiles from '../../admin/dashboard/ViewFiles';
import { AppContext } from '../../appContext/AppContext';

import './FileUpload.css'


function FileUpload() {
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState('');
  const [fileVersion, setFileVersion] = useState('');
  const [fileNumber, setFileNumber] = useState('');
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [documents, setDocuments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [userRole, setUserRole] = useState("");
 const [accessibleCategories, setAccessibleCategories] = useState([]);
//  const [department, setDepartment] = useState("");

const [searchTerm, setSearchTerm] = useState('')


 const [showUploadForm, setShowUploadForm] = useState(false);

 const {token, designation, department} = useContext(AppContext);
// console.log(department);

  useEffect(()=>{
   
    setUserRole(designation);

     // Define accessible categories based on role
    const allowedCategories = designation === "Supervisor" ? ['Policies', 'Form Format', 'Work Instructions & SOP']
     :['Work Instructions & SOP'] ;

      
     setAccessibleCategories(allowedCategories)
  },[designation])


  // console.log(accessibleCategories);

  useEffect(() => {
    const fetchDocuments = async () => {
      try{
        const response = await axios.get(`http://srv617987.hstgr.cloud:8080/documents/${department}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDocuments(response.data);

      }catch(err){
        console.error('Error fetching documents', err);
        setMessage(`Error fetching documents: ${err.message}`);
      }
    };
    fetchDocuments();
  },[token]);
  
  // console.log( documents);
  
// Filter the documents based on the both category and department
   const filteredDocument = documents.filter((doc) => {
         // console.log("documents", doc);
       if (documents.length > 0) {
        // For Admin , allowing Pending files regardles who upload them
        if(designation === "Admin"){
          return doc.department === department && accessibleCategories.includes(doc.category) &&
          (doc.status === "Approved" || doc.status === "Pending") &&
          (!selectedCategory || doc.category === selectedCategory);
        }

        // For Supervisor, allow Pending files only if they were uploaded by the supervisor
        if(designation === "Supervisor"){
          return doc.department === department && accessibleCategories.includes(doc.category) &&
                 (doc.status === "Approved" || (doc.designation === "Supervisor" && doc.status === "Pending")) &&
                 (!selectedCategory || doc.category === selectedCategory) && 
                  (doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 doc.fileNo.toLowerCase().includes(searchTerm.toLowerCase()));
        }

       // For Workers, exclude all Pending files
       if(designation === "Worker"){
        return doc.department === department && accessibleCategories.includes(doc.category) &&
        (doc.status === "Approved") &&
        (!selectedCategory || doc.category === selectedCategory) && 
         (doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.fileNo.toLowerCase().includes(searchTerm.toLowerCase()));
      }
  }
});


// console.log("filteredDocument:",filteredDocument);
// console.log(selectedCategory);



  const handleOnChange = (e) => {
    const selectedFile = Array.from(e.target.files);
    setFiles(selectedFile);
    setFileName(e.target.files[0].name); // Automatically set the first file name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files || !fileVersion || !fileNumber || !category || !department ) {
      setMessage('Please fill in all fields and select a file');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
      formData.append('filename', fileName); // Use file name from the file itself
      formData.append('fileVersion', fileVersion);
      formData.append('fileNo', fileNumber);
      formData.append('category', category);
      formData.append('department', department);
    });

    try {
      const response = await axios.post('http://srv617987.hstgr.cloud:8080/documents/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Ensure content type is set correctly
        },
      });
      // console.log(response.data);
      
      if (response.status === 201) {
        setMessage('File uploaded successfully');
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
        // addRecentFiles({ name: filename, timestamp: new Date() });

        // Fetch updated documents list
        const updatedDocuments = await axios.get(`http://srv617987.hstgr.cloud:8080/documents/${department}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDocuments(updatedDocuments.data);
        // console.log(documents);
        

        setFiles([]); // Clear files after upload
        setFileName('');
        setFileVersion('');
        setFileNumber('');
        setCategory('')
      } else {
        setMessage('File upload failed');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      setMessage(`File upload failed: ${err.message}`);
    }
  };

  // Delete file
  const handleDelete = async (docId) => {
    const confirmation = window.confirm('Are you sure you want to delete this document?');
    if(!confirmation){
      return;
    }
    try {
      const response = await axios.delete(`http://srv617987.hstgr.cloud:8080/documents/${docId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      

      if (response.status === 200) {
         // Filter out the deleted document immediately in the state
        setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== docId));
        setMessage('Document deleted successfully');
      } else {
        setMessage('Failed to delete document');
      }
    } catch (err) {
      console.error('Error deleting document:', err);
      setMessage(`Failed to delete document: ${err.message}`);
    }
  };

// To show files category wise
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }


// to show/hide upload form
const handleShowuploadbutton = ()=>{
  setShowUploadForm(!showUploadForm);
}

// user based width
const userBasedWidthStyle ={
  width: designation === "Worker" ? '100%' : '70%'
}


  return (
    <div>
    
      <div style={{ display: 'flex' ,flexWrap:"wrap" }}>
{/* Showing and hiding upload form */}
       <div className='form' style={{width:"30%"}}>
       {userRole === "Supervisor" && (
        <button
        className='btn btn-primary form_btn'
        onClick={handleShowuploadbutton}
        >
          {showUploadForm ? 'Add Document' : 'Add Document'}
        </button>
       )}

      {showUploadForm && userRole === "Supervisor" ? (
        <form className='form_form w-75'
          onSubmit={handleSubmit}
        >
        
          <h5 className='form_h5'>File Upload</h5>
          <div className="form-group">
            <label>Select File:</label>
            <input className="form-control border border-black" type="file" multiple onChange={handleOnChange} />
          </div>

          <div className="form-group">
            <label>File Name:</label>
            <input className="form-control border border-black" type="text" value={fileName} 
            onChange={(e) => setFileName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>File Version:</label>
            <input
              className="form-control border border-black"
              type="text"
              value={fileVersion}
              onChange={(e) => setFileVersion(e.target.value)}
              placeholder="e.g. v1.0"
              required
            />
          </div>
          <div className="form-group">
            <label>File Number:</label>
            <input
              className="form-control border border-black"
              type="text"
              value={fileNumber}
              onChange={(e) => setFileNumber(e.target.value)}
              placeholder="e.g.  AB-123 or 123"
              required
            />
          </div>
             <div className="form-group">
            <label>File Categories:</label>
             <select
            className="form-control border border-black" 
            value={category} onChange={(e) => setCategory(e.target.value)} required>
               <option value="">Select Category</option> 
                  {accessibleCategories.map((cat) => (
                 <option key={cat} value={cat}>
                   {cat}
                 </option>
               ))}
             </select>
           </div> 
          
          <button className="btn btn-primary form_btn_upload" type="submit">Upload</button>
        </form> 


       ) :(
        <></>
        
      )}
       <div style={{ marginTop: '10px', position:"sticky", top:"43rem",zIndex:"997" }}>
            {message && <p className='alert alert-success'>{message}</p>}
          </div>
      </div>

{/* Showing and hiding categories */}
            
        <div className='cat' style={userBasedWidthStyle} >
          {/* <div className='mt-4 text-center'>
       
        </div> */}
        < div className="navbar cat-1" >
  <div className="container-fluid cat-2">
    {/* <h6>Select Category:</h6> */}
    <ul className=" cat-ul">
      {(userRole === "Supervisor") && (
        <li className="nav-item cat-list "  key="all-categories">
          <button
            className={`nav-link ${selectedCategory === "" ? "active" : ""}`} 
            onClick={() => handleCategoryChange({ target: { value: "" } })}
            // role='button' //  Indicates that this anchor behaves like a button
          >
            All Categories
          </button>
        </li>
      )}
      {accessibleCategories.map((category) => (
        <li className="nav-item cat-list" key={category}>
          <button
            // href="#"
            className={`nav-link ${selectedCategory === category ? "active" : ""}`}
            onClick={() => handleCategoryChange({ target: { value: category } })}
          >
            {category}
          </button>
        </li>
      ))}
       <input
          type="text"
          placeholder="Search by filename or file number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', width: '50%', maxWidth: '400px',
             marginBottom: '1px' }}
        />
    </ul>
  </div>
  </div>
 

           
            {/* List of uploaded files */}  
           {/* style={containerStyle} */}
          
          <ol className='cat_ol'>  
          {filteredDocument.length === 0 ? (
            <p className='cat_ol-1'>No files available for the selected category.</p>
          ) : (   
            filteredDocument.reverse().map((file) => (
              <li className='cat_ol-2' key={file.id} style={{ margin: '10px' }}>
                <div className="card w-75 cat_ol-3" >
                  <div className="card-body cat_ol-4" style={{ display: 'flex', justifyContent: 'space-between',flexWrap:"wrap" }}>
                    <div>
                      <p className="card-title cat_ol-5"><b>File Name:</b> {file.filename}</p>
                      <p className="card-text cat_ol-6" style={{ margin: "0" }}><b>File Version:</b> {file.fileVersion}</p>
                      <p className="card-text cat_ol-6" style={{ margin: "0" }}><b>File Number:</b> {file.fileNo}</p>
                      {/* <p className="card-text"><b>File Type:</b> {file.filetype}</p> */}
                      <p className="card-text cat_ol-7"><b>Status:</b> {file.status}</p>
                    </div>
                    <div >
                     
                      {(userRole === "Supervisor" && file.status === "Pending")? (
                        
                      
                      <button className="btn btn-primary card_btn"
                       onClick={() => handleDelete(file.id)}>
                        Delete
                      </button>
                      ): (
                        <></>
                      )}
                     
                      
                      <ViewFiles className="btn card_btn"
                      file={file} />
                      
                    </div>
                 </div>
                </div>
              </li>
            ))
            )}
          </ol>
          </div>
          </div>
    </div>
  );
}

export default FileUpload;



