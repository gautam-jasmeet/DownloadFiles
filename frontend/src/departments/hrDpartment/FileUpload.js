import React, { useContext, useEffect, useState } from 'react';
import RecentFilesContext from '../../context/RecentFilesContext';
import axios from 'axios';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [filename, setFileName] = useState('');
  const [fileVersion, setFileVersion] = useState('');
  const [filetype, setFileType] = useState('');
  // const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await axios.get('http://localhost:8080/documents');
      setDocuments(response.data);
    };
    fetchDocuments();
  },[]);
  console.log(documents);
  


  const context = useContext(RecentFilesContext);
  const { addRecentFiles } = context;

  const containerStyle = {
    height: '100vh',
    overflowY: 'scroll',
    border: '1px solid white',
    padding: '1rem',
  };

  const handleOnChange = (e) => {
    const selectedFile = Array.from(e.target.files);
    setFiles(selectedFile);
    setFileName(e.target.files[0].name); // Automatically set the first file name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files || !fileVersion || !filetype  || !status) {
      setMessage('Please fill in all fields and select a file');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
      formData.append('filename', filename); // Use file name from the file itself
      formData.append('fileVersion', fileVersion);
      formData.append('filetype', filetype);
      // formData.append('department', department);
      formData.append('status', status);
    });

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data', // Ensure content type is set correctly
        },
      });
      //  console.log(response);
       
      if (response.status === 200) {
        setMessage('File uploaded successfully');
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
        addRecentFiles({ name: filename, timestamp: new Date() });

        setFiles([]); // Clear files after upload
      } else {
        setMessage('File upload failed');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
    //   if (err.response) {
    //     // If response exists but with error
    //     console.error('Response data:', err.response.data);
    //     console.error('Response status:', err.response.status);
    //     console.error('Response headers:', err.response.headers);
    //     setMessage(`File upload failed: ${err.response.data.error || err.response.status}`);
    // } else if (err.request) {
    //     // If no response received
    //     console.error('No response received:', err.request);
    //     setMessage('File upload failed: No response from server');
    // } else {
    //     // Some other error occurred
    //     console.error('Error:', err.message);
    //     setMessage(`File upload failed: ${err.message}`);
    // }
    }
  };

  // Delete file 
  const handleDelete = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setDocuments(updatedFiles);
  };

  // View file
  const handleViewFile = (file) => {
    const fileURL = URL.createObjectURL(file);
    const fileType = file.type;

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
  };

  return (
    <>
      <div   style={{ display: 'flex' }} >
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
            <input  className="form-control border border-black" type="file" multiple onChange={handleOnChange} />
          </div>

          <div className="form-group">
            <label>File Name:</label>
            <input className="form-control border border-black" type="text" value={filename} onChange={(e) => setFileName(e.target.value)} readOnly />
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
            <label>File Type:</label>
            <input
            className="form-control border border-black"
              type="text"
              value={filetype}
              onChange={(e) => setFileType(e.target.value)}
              placeholder="e.g. pdf video image excel doc"
              required
            />
          </div>

          {/* <div className="form-group">
            <label>Department:</label>
            <select
            className="form-control border border-black" 
            value={department} onChange={(e) => setDepartment(e.target.value)} required>
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
              <option value="Sales">Sales</option>
            </select>
          </div> */}

          <div className="form-group">
            <label>Status:</label>
            <select
            className="form-control border border-black" 
            value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button className="btn btn-primary mt-3" type="submit">Upload</button>
     <div style={{ marginTop: '10px' }}>
        {message && <p className='alert alert-success'>{message}</p>}
        </div>
        </form>
      {/* List of uploaded files */}
      <div  style={{margin:"10px", padding:"10px", width:"100%", height:"100%"}}>
        <ol style={containerStyle}>
          {documents.map((file, index) => (
            <li key={index} style={{ margin: '5px' }}>
              <div className="card w-50" style={{borderRadius:'15px 50px 30px'}}>
                <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                  <p className="card-title"><b>File Name:</b> {file.filename}</p>
                  <p className="card-text" style={{margin:"0"}}> <b>File Version:</b> {file.fileVersion}  </p>
                  <p className="card-text" ><b>File Type:</b>  {file.filetype}</p>
                  </div>
                  <div>
                  <button className="btn btn-primary ms-1 bs-" onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                  <button className="btn btn-primary ms-1" onClick={() => handleViewFile(file)}>
                    View
                  </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      
      </div>
    </>
  );
}

export default FileUpload;
