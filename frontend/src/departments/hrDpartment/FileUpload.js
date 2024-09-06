
import React, {  useEffect, useState } from 'react';
// import RecentFilesContext from '../../context/RecentFilesContext';
import axios from 'axios';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [filename, setFileName] = useState('');
  const [fileVersion, setFileVersion] = useState('');
  const [filetype, setFileType] = useState('');
  // const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await axios.get('http://localhost:8080/documents');
      setDocuments(response.data);
    };
    fetchDocuments();
  }, []);

  // const context = useContext(RecentFilesContext);
  // const { addRecentFiles } = context;

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
    if (!files || !fileVersion || !filetype ) {
      setMessage('Please fill in all fields and select a file');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
      formData.append('filename', filename); // Use file name from the file itself
      formData.append('fileVersion', fileVersion);
      formData.append('filetype', filetype);
      // formData.append('status', status);
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
    const fileURL = file.fileUrl || '';
    const fileType = file.filetype || '';

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
            <label>Status:</label>
            <select
              className="form-control border border-black"
              value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div> */}

          <button className="btn btn-primary mt-3" type="submit">Upload</button>
          <div style={{ marginTop: '10px' }}>
            {message && <p className='alert alert-success'>{message}</p>}
          </div>
        </form>

        {/* List of uploaded files */}
        <div style={{ margin: "10px", padding: "10px", width: "100%", height: "100%" }}>
          <ol style={containerStyle}>
            {documents.map((file) => (
              <li key={file._id} style={{ margin: '5px' }}>
                <div className="card w-50" style={{ borderRadius: '15px 50px 30px' }}>
                  <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p className="card-title"><b>File Name:</b> {file.filename}</p>
                      <p className="card-text" style={{ margin: "0" }}><b>File Version:</b> {file.fileVersion}</p>
                      <p className="card-text"><b>File Type:</b> {file.filetype}</p>
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
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default FileUpload;

