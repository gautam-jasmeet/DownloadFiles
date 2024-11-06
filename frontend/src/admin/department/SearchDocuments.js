import React, { useState, useEffect } from 'react';
import ViewFiles from '../dashboard/ViewFiles';

function SearchDocuments({ docs }) {
    const [searchDoc, setSearchDoc] = useState('');
    const [filteredDocs, setFilteredDocs] = useState(docs);

    useEffect(() => {
        if (searchDoc === '') {
            // Show all docs if search input is empty
            setFilteredDocs(docs);
        } else {
            // Filter docs based on search input
            const filterBySearch = docs.filter((item) => {
                const { filename, fileNo } = item;
                return (
                    filename.toLowerCase().includes(searchDoc.toLowerCase()) ||
                    fileNo.toLowerCase().includes(searchDoc.toLowerCase())
                );
            });
            setFilteredDocs(filterBySearch);
        }
    }, [searchDoc, docs]); // Re-run filter when searchDoc or docs change

    return (
        <div>
            <div>
                <input
                    type='text'
                    placeholder='Search by filename or fileNo'
                    onChange={(e) => setSearchDoc(e.target.value)}
                    value={searchDoc}
                />
            </div>
            <div>
                {filteredDocs.length > 0 ? (
                    filteredDocs.map((doc, index) => (
                        <div key={index}>
                            <div className="card w-75 cat_ol-3">
                  <div className="card-body cat_ol-4" style={{ display: 'flex', justifyContent: 'space-between',flexWrap:"wrap" }}>
                    <div>
                      <p className="card-title cat_ol-5"><b>File Name:</b> {doc.filename}</p>
                      <p className="card-text cat_ol-6" style={{ margin: "0" }}><b>File Version:</b> {doc.fileVersion}</p>
                      <p className="card-text cat_ol-7"><b>Status:</b> {doc.status}</p>
                    </div>
                    <div >
                    {/* <button className="btn btn-primary card_btn"
                       onClick={() => handleDelete(doc.id)}>
                        Delete
                      </button> */}
                      <ViewFiles className="btn card_btn" file={doc} />
                    </div>
                  </div>
                </div>
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
}

export default SearchDocuments;
