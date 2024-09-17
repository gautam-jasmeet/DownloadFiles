import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import ViewFiles from '../../component/dashboard/ViewFiles';

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
 const [department, setDepartment] = useState("");


 const [showUploadForm, setShowUploadForm] = useState(false);


  useEffect(()=>{
    const designation = localStorage.getItem("designation");
    const departmentName = localStorage.getItem("department");
    // console.log(departmentName);
    // console.log(designation);
    setUserRole(designation);
    setDepartment(departmentName);

     // Define accessible categories based on role
    const allowedCategories = designation === "Supervisor" ? ['Policies', 'Form Format', 'Work Instructions', 'SOP']
     :['Work Instructions', 'SOP'] ;

      
     setAccessibleCategories(allowedCategories)
  },[])


  // console.log(accessibleCategories);

  useEffect(() => {
    const fetchDocuments = async () => {
      try{
        const response = await axios.get(`http://localhost:8080/documents/department`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setDocuments(response.data);
      }catch(err){
        console.error('Error fetching documents', err);
        setMessage(`Error fetching documents: ${err.message}`);
      }
    };
    fetchDocuments();
  },[]);
  
  // console.log( documents);
  
// Filter the documents based on the both category and department
const filteredDocument = documents.filter((doc) => {
  // console.log("documents", doc);
  if (documents.length > 0) {
    return  doc.department === department && accessibleCategories.includes(doc.category) &&
      (!selectedCategory || doc.category === selectedCategory);
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
      const response = await axios.post('http://localhost:8080/documents/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data', // Ensure content type is set correctly
        },
      });
      if (response.status === 200) {
        setMessage('File uploaded successfully');
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
        // addRecentFiles({ name: filename, timestamp: new Date() });

        // Fetch updated documents list
        const updatedDocuments = await axios.get('http://localhost:8080/documents/department', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
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
      const response = await axios.delete(`http://localhost:8080/documents/${docId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
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


  return (
    <>
    
      <div style={{ display: 'flex' }}>

       <div className='form'>
       {userRole === "Supervisor" && (
        <button
        className='btn btn-primary form_btn'
        onClick={handleShowuploadbutton}
        >
          {showUploadForm ? 'Add Document' : 'Add Document'}
        </button>
       )}

      {showUploadForm && userRole === "Supervisor" ? (
        <form className='form_form'
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
            onChange={(e) => setFileName(e.target.value)} readOnly />
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

            
        <div className='cat'>
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
    </ul>
  </div>
  </div>
 

           
            {/* List of uploaded files */}  
           {/* style={containerStyle} */}
          
          <ol className='cat_ol'>  
          {filteredDocument.length === 0 ? (
            <p className='cat_ol-1'>No files available for the selected category.</p>
          ) : (   
            filteredDocument.map((file) => (
              <li className='cat_ol-2' key={file.id} style={{ margin: '10px' }}>
                <div className="card w-50 cat_ol-3" >
                  <div className="card-body cat_ol-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p className="card-title cat_ol-5"><b>File Name:</b> {file.filename}</p>
                      <p className="card-text cat_ol-6" style={{ margin: "0" }}><b>File Version:</b> {file.fileVersion}</p>
                      {/* <p className="card-text"><b>File Type:</b> {file.filetype}</p> */}
                      <p className="card-text cat_ol-7"><b>Status:</b> {file.status}</p>
                    </div>
                    <div >
                      {userRole === "Supervisor" ? (
                        
                      
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
    </>
  );
}

export default FileUpload;



