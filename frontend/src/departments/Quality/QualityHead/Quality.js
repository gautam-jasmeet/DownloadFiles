import React, { useContext, useState,useEffect } from 'react'
import axios from 'axios'
import { AppContext } from '../../../appContext/AppContext'
import useGet from '../../../customHooks/useGet'
import ViewFiles from '../../../admin/dashboard/ViewFiles'

function Quality() {
  const [selectedCategory,setSelectedCategory] = useState('')
  const [message,setMessage] = useState('')
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const accessibleCategories =['Policies', 'Form Format']
  const [searchTerm, setSearchTerm] = useState('')

  const {token,department} = useContext(AppContext)

     // Fetch employee data
  const {data, error,loading} = useGet(`http://srv617987.hstgr.cloud:8080/documents/${department}`);
  // console.log(data);
  
   // Handle category selection change
   const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter documents by department and category whenever the documents or departmentName change
  useEffect(() => {
    const filtered = data.filter(doc => 
      (!selectedCategory || doc.category === selectedCategory) &&(
        doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.fileNo.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    setFilteredDocuments(filtered);
  }, [data, selectedCategory,searchTerm]);

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
      })
      if (response.status === 200) {
        // Directly update both the documents and filteredDocuments state
    // setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== docId));
    // setFilteredDocuments((prevFilteredDocs) =>
    //   prevFilteredDocs.filter((doc) => doc.id !== docId)
    // );
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
          <div style={{ display: 'flex' }}>
      
      {/* Category Selection */}
      <div className='cat' style={{width:"100%"}}>
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
             {/* Search Field */}
             <input
                type="text"
                placeholder="Search by filename or fileNo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '5px', margin: '10px 0', width: '50%' }}
              />
          </div>
        </div>

        {/* List of filtered documents */}
        <ol className='cat_ol'>
          {filteredDocuments.length === 0 ? (
            <p className='cat_ol-1'>No files available for the selected category.</p>
          ) : (
            filteredDocuments.map((file) => (
              <li className='cat_ol-2' key={file.id} style={{ margin: '10px' }}>
                <div className="card w-75 cat_ol-3">
                  <div className="card-body cat_ol-4" style={{ display: 'flex', justifyContent: 'space-between',flexWrap:"wrap" }}>
                    <div>
                      <p className="card-title cat_ol-5"><b>File Name:</b> {file.filename}</p>
                      <p className="card-text cat_ol-6" style={{ margin: "0" }}><b>File Version:</b> {file.fileVersion}</p>
                      <p className="card-text cat_ol-7"><b>Status:</b> {file.status}</p>
                    </div>
                    <div >
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
  )
}

export default Quality