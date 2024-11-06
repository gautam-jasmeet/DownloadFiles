import React, { useState , useEffect} from 'react'

function SearchDocuments({docs}) {
    const [searchDoc,setSearchDoc] = useState('')
    const [filteredDocs,setFilteredDocs] = useState(docs);
    console.log(docs);
    // const handleSearchDoc = ()=>{
    //     const filterBySearch = docs.filter((item)=>{
    //         const {filename, fileNo} = item;
    //        return(
    //         filename.toLowerCase().includes(searchDoc.toLowerCase()) ||
    //         fileNo.toLowerCase().includes(searchDoc.toLowerCase())
    //        )
    //     })
    //     setFilteredDocs(filterBySearch)
    // }
    // console.log(filteredDocs);
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
            placeholder='Search by fileName or fileNo'
            onChange={(e)=>setSearchDoc(e.target.value)}
            value={searchDoc}
            />
            {/* <button onClick={handleSearchDoc}>Search</button> */}
        </div>
        <div>
            {/* {filteredDocs.map((doc,index)=>{
                <div key={index}>
                    <p>File Name: {doc.filename}</p>
                    <p>File Number: {doc.fileNo}</p>

                </div>
            })} */}
             {filteredDocs.length > 0 ? (
                    filteredDocs.map((doc, index) => (
                        <div key={index}>
                            <p>Filename: {doc.filename}</p>
                            <p>File No: {doc.fileNo}</p>
                            <p>Category: {doc.category}</p>
                            <p>Department: {doc.department}</p>
                            <p>Designation: {doc.designation}</p>
                            <p>Shift: {doc.shift}</p>
                            <p>Status: {doc.status}</p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
        </div>
    </div>
  )
}

export default SearchDocuments