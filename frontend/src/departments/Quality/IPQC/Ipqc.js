import React, { useContext } from 'react'
import useGet from '../../../customHooks/useGet'
import ViewFiles from '../../../admin/dashboard/ViewFiles'

function Ipqc() {

   
    const {data,error,loading} = useGet(`http://srv617987.hstgr.cloud:8080/documents/IPQC`)
    
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
                //   className={`nav-link ${selectedCategory === "" ? "active" : ""}`}
                //   onClick={() => handleCategoryChange({ target: { value: "" } })}
                >
                 Work Instructions & SOP
                </button>
              </li>
              {/* {accessibleCategories.map((category) => (
                <li className="nav-item cat-list" key={category}>
                  <button
                    className={`nav-link ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => handleCategoryChange({ target: { value: category } })}
                  >
                    {category}
                  </button>
                </li> */}
              {/* ))} */}
            </ul>
          </div>
        </div>

        {/* List of filtered documents */}
        <ol className='cat_ol'>
          {data.length === 0 ? (
            <p className='cat_ol-1'>No files available for the selected category.</p>
          ) : (
            data.map((file) => (
              <li className='cat_ol-2' key={file.id} style={{ margin: '10px' }}>
                <div className="card w-75 cat_ol-3">
                  <div className="card-body cat_ol-4" style={{ display: 'flex', justifyContent: 'space-between',flexWrap:"wrap" }}>
                    <div>
                      <p className="card-title cat_ol-5"><b>File Name:</b> {file.filename}</p>
                      <p className="card-text cat_ol-6" style={{ margin: "0" }}><b>File Version:</b> {file.fileVersion}</p>
                      <p className="card-text cat_ol-7"><b>Status:</b> {file.status}</p>
                    </div>
                    <div >
                    {/* <button className="btn btn-primary card_btn"
                       onClick={() => handleDelete(file.id)}>
                        Delete
                      </button> */}
                      <ViewFiles className="btn card_btn" file={file} />
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ol>
      </div>
 
      {error && <p className='alert alert-danger'>{error}</p>}
    </div>
    </div>
  )
}

export default Ipqc;