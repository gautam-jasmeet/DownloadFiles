
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




  const categories = ['Policies', 'Forms Format', 'Work Instructions', 'SOP'];
  

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await axios.get('http://localhost:8080/documents');
      setDocuments(response.data);

    };
    fetchDocuments();
  }, []);
  
  


  
  
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

  // Get the file type from the file name e.g- image.png
  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    
    switch(extension) {
      case 'pdf':
        return 'application/pdf';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'image/*';
      case 'mp4':
        return 'video/mp4';
      case 'doc':
      case 'docx':
        return 'application/msword';
      case 'xls':
      case 'xlsx':
        return 'application/vnd.ms-excel';
      case 'ppt':
      case 'pptx':
        return 'application/vnd.ms-powerpoint';
      default:
        return 'unknown';
    }
  }

 
  

  // View file
  const handleViewFile = (file) => {
    const fileURL = file.fileUrl || '';
    const fileType = getFileType(file.filename) || '';
    console.log(fileType);
    

    if (fileType.startsWith('image/')) {
      window.open(fileURL);
    } else if (fileType.startsWith('video/')) {
      window.open(fileURL);
    } else if (fileType === 'application/pdf') {
      window.open(fileURL);
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType === 'application/msword' ||
      fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      fileType === 'application/vnd.ms-excel'
    ) {
      window.open(fileURL);
    } else {
      alert('File type not supported for preview');
    }

    console.log(file);
    
  };

  // to open files category wise
  // const groupFilesByCategory = (files) => {
  //   return files.reduce((acc, file) => {
  //     if (!acc[file.category]) {
  //       acc[file.category] = [];
  //     }
  //     acc[file.category].push(file);
  //     return acc;
  //   }, {});
  // };

  // const groupedFiles = groupFilesByCategory(documents);
  // console.log(groupedFiles);

  

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  const filteredDocuments = selectedCategory
    ? documents.filter((doc) => doc.category === selectedCategory)
    : documents;
  

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
               <option value="Policies">Policies</option>
               <option value="Forms Format">Forms Format</option>
               <option value="SOP">SOP</option>
               <option value="Work Instructions">Work Instructions</option>
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
        <div className='form-group'>
          <label>Select Category:</label>
          <select
            className="form-control border border-black"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

        </div>


       
          {/* {Object.keys(groupedFiles).map((category) => (
            <div key={category} style={{display: 'flex'}}>
              <h3>{category}</h3> */}
              
           {/* style={containerStyle} */}
          <ol >  
          {filteredDocuments.length === 0 ? (
            <p>No files available for the selected category.</p>
          ) : (   
            filteredDocuments.map((file) => (
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



