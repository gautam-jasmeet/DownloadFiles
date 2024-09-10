
import React, {  useEffect, useState } from 'react';
// import RecentFilesContext from '../../context/RecentFilesContext';
import axios from 'axios';


function FileUpload() {
  const [files, setFiles] = useState([]);
  const [filename, setFileName] = useState('');
  const [fileVersion, setFileVersion] = useState('');
  // const [filetype, setFileType] = useState('');
  const [category, setCategory] = useState("");
  // const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [documents, setDocuments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [userRole, setUserRole] = useState("");
 const [accessibleCategories, setAccessibleCategories] = useState([]);



  // const categories = ['Policies', 'Forms Format', 'Work Instructions', 'SOP'];


  useEffect(()=>{
    const designation = localStorage.getItem("designation");
    // console.log(designation);
    setUserRole(designation);

     // Define accessible categories based on role
    const allowedCategories = designation === "Supervisor" ? ['Policies', 'Forms Format', 'Work Instructions', 'SOP']
     :['Work Instructions', 'SOP'] ;

      
     setAccessibleCategories(allowedCategories)
  },[])


 
  console.log(accessibleCategories);
  
  

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await axios.get('http://localhost:8080/documents');
      setDocuments(response.data);

    };
    fetchDocuments();
  }, []);
  
  
// Filter the documents based on the selected category and accessible categories
const filteredDocument = documents.filter((doc) => {
  return accessibleCategories.includes(doc.category) &&
    (!selectedCategory || doc.category === selectedCategory);
});
console.log(documents);

console.log(filteredDocument);
console.log(selectedCategory);


  
  
  // const context = useContext(RecentFilesContext);
  // const { addRecentFiles } = context;

  // const containerStyle = {
  //   height: '100vh',
  //   overflowY: 'scroll',
  //   border: '1px solid white',
  //   padding: '1rem',
  // };

  const handleOnChange = (e) => {
    const selectedFile = Array.from(e.target.files);
    setFiles(selectedFile);
    setFileName(e.target.files[0].name); // Automatically set the first file name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files || !fileVersion || !category ) {
      setMessage('Please fill in all fields and select a file');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
      formData.append('filename', filename); // Use file name from the file itself
      formData.append('fileVersion', fileVersion);
      // formData.append('filetype', filetype);
      formData.append('category', category);
    });

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
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
        const updatedDocuments = await axios.get('http://localhost:8080/documents');
        setDocuments(updatedDocuments.data);
        console.log(documents);
        

        setFiles([]); // Clear files after upload
        setFileName('');
        setFileVersion('');
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
    try {
      const response = await axios.delete(`http://localhost:8080/documents/${docId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (response.status === 200) {
        setDocuments((prevDocs) => prevDocs.filter((doc) => doc._id !== docId));
        setMessage('Document deleted successfully');
      } else {
        setMessage('Failed to delete document');
      }
    } catch (err) {
      console.error('Error deleting document:', err);
      setMessage(`Failed to delete document: ${err.message}`);
    }
  };

 
 
  

  // View file
  const handleViewFile = (file) => {
    
    const fileURL = `http://localhost:8080${file.fileUrl}`; // Ensure full path
  const fileExtension = file.filename.split('.').pop().toLowerCase();
  
  console.log(fileURL);
    console.log(fileExtension);
  
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fileExtension)) {
      // Image files
      window.open(fileURL);
    } else if (['mp4', 'avi', 'mov', 'wmv', 'mkv'].includes(fileExtension)) {
      // Video files
      window.open(fileURL);
    } else if (fileExtension === 'pdf') {
      // PDF files
      window.open(fileURL);
    } else if (
      ['doc', 'docx', 'xls', 'xlsx'].includes(fileExtension)
    ) {
      // Word/Excel files
      window.open(fileURL);
    } else {
      alert('File type not supported for preview');
    }
  
    console.log(file);
   
    
    
  };

  
  
  
  

  
// To show files category wise
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  // const filteredDocuments = selectedCategory
  //   ? documents.filter((doc) => doc.category === selectedCategory)
  //   : documents;



    
  

  return (
    <>
    
      <div style={{ display: 'flex' }}>
        <form
          onSubmit={handleSubmit}
          style={{
            border: '1px solid white',
            borderRadius: '25px',
            margin: '2em ',
            padding: '2em',
            width: '300px',
          }}
        >
          <h5>File Upload</h5>
          <div className="form-group">
            <label>Select File:</label>
            <input className="form-control border border-black" type="file" multiple onChange={handleOnChange} />
          </div>

          <div className="form-group">
            <label>File Name:</label>
            <input className="form-control border border-black" type="text" value={filename} 
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
            <label>File Categories:</label>
             <select
            className="form-control border border-black" 
            value={category} onChange={(e) => setCategory(e.target.value)} required>
               <option value="">Select Category</option>
               {/* <option value="Policies">Policies</option>
               <option value="Forms Format">Forms Format</option>
               <option value="SOP">SOP</option>
               <option value="Work Instructions">Work Instructions</option> */}
                {accessibleCategories.map((cat) => (
                 <option key={cat} value={cat}>
                   {cat}
                 </option>
               ))}
             </select>
           </div>

         
          <button className="btn btn-primary mt-3" type="submit">Upload</button>
          <div style={{ marginTop: '10px' }}>
            {message && <p className='alert alert-success'>{message}</p>}
          </div>
        </form>

        {/* List of uploaded files */}
        {/* Category Dropdown */}
        <div style={{ margin: "10px", padding: "10px", width: "100%", height: "100%" }}>
        <div className='form-group' style={{display: 'flex' , width:"50%",marginBottom:"20px", 
          position:"sticky", top:"130px",zIndex:"999"}}>
          <label>Select Category:</label>
          <select
            className="form-control border border-black"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {userRole === "Supervisor" && <option value="">All Categories</option>}
            {accessibleCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

        </div>

              
           {/* style={containerStyle} */}
          <ol >  
          {filteredDocument.length === 0 ? (
            <p>No files available for the selected category.</p>
          ) : (   
            filteredDocument.map((file) => (
              <li key={file._id} style={{ margin: '5px' }}>
                <div className="card w-50" style={{ borderRadius: '15px 50px 30px' }}>
                  <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p className="card-title"><b>File Name:</b> {file.filename}</p>
                      <p className="card-text" style={{ margin: "0" }}><b>File Version:</b> {file.fileVersion}</p>
                      <p className="card-text"><b>File Type:</b> {file.filetype}</p>
                      <p className="card-text"><b>Status:</b> {file.status}</p>
                    </div>
                    <div>
                      <button className="btn btn-primary ms-1" onClick={() => handleDelete(file._id)}>
                        Delete
                      </button>
                      <button className="btn btn-primary ms-1" onClick={() => handleViewFile(file)}>
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            )))}
          </ol>
          </div>
          {/* ))} */}
        </div>
      {/* </div> */}
    </>
  );
}

export default FileUpload;



