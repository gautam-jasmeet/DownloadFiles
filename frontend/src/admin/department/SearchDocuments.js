import React, { useState } from 'react'

function SearchDocuments({docs}) {
    const [searchDoc,setSearchDoc] = useState('')
    // console.log(docs);
    const handleSearchDoc = ()=>{
        const filterBySearch = docs.filter((item)=>{
            if(item.toLowerCase().includes(searchDoc.toLowerCase())){
                return item;
            }
        })
        setSearchDoc(filterBySearch)
    }
    
  return (
    <div>
        <div>
            <input onChange={(e)=>setSearchDoc(e.target.value)}/>
            <button onClick={handleSearchDoc}>search</button>
        </div>
    </div>
  )
}

export default SearchDocuments