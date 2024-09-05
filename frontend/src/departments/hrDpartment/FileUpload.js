import React, { useContext, useState } from 'react';
import RecentFilesContext from '../../context/RecentFilesContext';
import axios from 'axios';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [filename, setFileName] = useState('');
  const [fileVersion, setFileVersion] = useState('');
  const [filetype, setFileType] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const context = useContext(RecentFilesContext);
  const { addRecentFiles } = context;

  const containerStyle = {
    height: '200px',
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
    if (!files || !fileVersion || !filetype || !department || !status) {
      setMessage('Please fill in all fields and select a file');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
      formData.append('filename', filename); // Use file name from the file itself
      formData.append('fileVersion', fileVersion);
      formData.append('filetype', filetype);
      formData.append('department', department);
      formData.append('status', status);
    });

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data', // Ensure content type is set correctly
        },
      });
       console.log(response);
       
      if (response.status === 200) {
        setMessage('File uploaded successfully');
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
        setFiles([]); // Clear files after upload
      } else {
        setMessage('File upload failed');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      if (err.response) {
        // If response exists but with error
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        console.error('Response headers:', err.response.headers);
        setMessage(`File upload failed: ${err.response.data.error || err.response.status}`);
    } else if (err.request) {
        // If no response received
        console.error('No response received:', err.request);
        setMessage('File upload failed: No response from server');
    } else {
        // Some other error occurred
        console.error('Error:', err.message);
        setMessage(`File upload failed: ${err.message}`);
    }
    }
  };

  const handleDelete = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
  };

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
      <div style={{ margin: '2em', display: 'flex', justifyContent: 'center' }}>
        <form
          onSubmit={handleSubmit}
          style={{
            border: '1px solid black',
            borderRadius: '25px',
            margin: '2em 0',
            padding: '2em',
            width: '300px',
          }}
        >
          <h2>File Upload</h2>
          <div>
            <label>Select File:</label>
            <input type="file" multiple onChange={handleOnChange} />
          </div>

          <div>
            <label>File Name:</label>
            <input type="text" value={filename} onChange={(e) => setFileName(e.target.value)} readOnly />
          </div>

          <div>
            <label>File Version:</label>
            <input
              type="text"
              value={fileVersion}
              onChange={(e) => setFileVersion(e.target.value)}
              placeholder="e.g. v1.0"
              required
            />
          </div>

          <div>
            <label>File Type:</label>
            <input
              type="text"
              value={filetype}
              onChange={(e) => setFileType(e.target.value)}
              placeholder="e.g. pdf video image excel doc"
              required
            />
          </div>

          <div>
            <label>Department:</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div>
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button type="submit">Upload</button>
        </form>
        {message && <p>{message}</p>}
      </div>

      {/* List of uploaded files */}
      <div style={containerStyle}>
        <ol>
          {uploadedFiles.map((file, index) => (
            <li key={index} style={{ margin: '5px' }}>
              <div className="card w-50">
                <div className="card-body">
                  <h5 className="card-title">File name: {file.name}</h5>
                  <p className="card-text">Last Modified: {new Date(file.lastModified).toLocaleDateString()}</p>
                  <button className="btn btn-primary ms-1" onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                  <button className="btn btn-primary ms-1" onClick={() => handleViewFile(file)}>
                    View
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default FileUpload;
