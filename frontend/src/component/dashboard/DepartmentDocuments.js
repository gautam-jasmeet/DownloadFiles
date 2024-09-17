import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ViewFiles from '../dashboard/ViewFiles';  // Import your ViewFiles component
import DeptHeader from '../../shared/DeptHeader';
import  '../../departments/sharedDept/FileUpload.css'; // If you're using a custom header

const DepartmentDocuments = () => {
  const { departmentName } = useParams(); // Capture the department name from URL
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const accessibleCategories = ['Policies', 'Form Format', 'Work Instructions', 'SOP']; // Admin's categories
 

  // Fetch all documents for the selected department
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/documents/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents', error);
        setMessage(`Error fetching documents: ${error.message}`);
      }
    };
    fetchDocuments();
  }, []);

  // Filter documents by department and category whenever the documents or departmentName change
  useEffect(() => {
    const filtered = documents.filter(doc => doc.department === departmentName && 
      (!selectedCategory || doc.category === selectedCategory));
    setFilteredDocuments(filtered);
  }, [documents, departmentName, selectedCategory]);



  // Handle category selection change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
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
          // Directly update both the documents and filteredDocuments state
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== docId));
      setFilteredDocuments((prevFilteredDocs) =>
        prevFilteredDocs.filter((doc) => doc.id !== docId)
      );
        setMessage('Document deleted successfully');
      } else {
        setMessage('Failed to delete document');
      }
    } catch (err) {
      console.error('Error deleting document:', err);
      setMessage(`Failed to delete document: ${err.message}`);
    }
  };

  return (
    <div>
      <DeptHeader header={`${departmentName} Department`} />

      <div style={{ display: 'flex' }}>
      
      {/* Category Selection */}
      <div className='cat'>
        <div className="navbar cat-1">
          <div className="container-fluid cat-2">
            <ul className="cat-ul">
              <li className="nav-item cat-list">
                <button
                  className={`nav-link ${selectedCategory === "" ? "active" : ""}`}
                  onClick={() => handleCategoryChange({ target: { value: "" } })}
                >
                  All Categories
                </button>
              </li>
              {accessibleCategories.map((category) => (
                <li className="nav-item cat-list" key={category}>
                  <button
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

        {/* List of filtered documents */}
        <ol className='cat_ol'>
          {filteredDocuments.length === 0 ? (
            <p className='cat_ol-1'>No files available for the selected category.</p>
          ) : (
            filteredDocuments.map((file) => (
              <li className='cat_ol-2' key={file.id} style={{ margin: '10px' }}>
                <div className="card w-50 cat_ol-3">
                  <div className="card-body cat_ol-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p className="card-title cat_ol-5"><b>File Name:</b> {file.filename}</p>
                      <p className="card-text cat_ol-6" style={{ margin: "0" }}><b>File Version:</b> {file.fileVersion}</p>
                      <p className="card-text cat_ol-7"><b>Status:</b> {file.status}</p>
                    </div>
                    <div>
                    <button className="btn btn-primary card_btn"
                       onClick={() => handleDelete(file.id)}>
                        Delete
                      </button>
                      <ViewFiles className="btn card_btn" file={file} />
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ol>
      </div>
      {message && <p className='alert alert-danger'>{message}</p>}
    </div>
    </div>
  );
};

export default DepartmentDocuments;
