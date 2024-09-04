import React, { useContext, useState } from 'react'
import RecentFilesContext from '../../context/RecentFilesContext';

function FileUpload() {
    const [files, setFiles] =useState([]);
    const [uploadedFiles, setUploadedFiles] =useState([]);

    const context = useContext(RecentFilesContext);
    // console.log(context);
    

    const {addRecentFiles} = context;

    const containerStyle = {
        height :"200px",
        overflowY:"scroll",
        border:"1px solid white",
        padding:"1rem"
    }



   

    const handleOnChange = (e) => {
        // setFiles(e.target.files[0]);

        // converting the file list object into an array
        const selectedFile = Array.from(e.target.files);
        // const updatedFiles = selectedFile.map((file)=>({
        //     name :file.name,
        //     lastModified: new Date(file.lastModified).toLocaleDateString(),
        // }));
       
        
        setFiles([ ...selectedFile])

       
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        if(files.length>0){
            setUploadedFiles((prevFiles)=>[...prevFiles, ...files])
            // console.log(files);
           
            files.forEach((file) =>{   
                if (addRecentFiles) {  // Check if addRecentFile is defined
               addRecentFiles({
                 name: file.name,
                 lastModified: new Date(file.lastModified).toLocaleDateString(),
                 timestamp: new Date(),
               });
             } else {
               console.error("addRecentFile is not defined");
             }
       });
            
            setFiles([]);  // // Clear files after upload
        }
        
    }

    const handleDelete = (index)=>{
        const updatedFiles = uploadedFiles.filter((_,i)=>i!==index);
        setUploadedFiles(updatedFiles);
    } 

    // onChange --> handleFileUpload
    const handleFileUpload = (e)=>{
        const newFiles = Array.from(e.target.files);
        setUploadedFiles((prevFiles)=>[...prevFiles, ...newFiles]);

       
    }

    const handleUpdateFile = (index)=>{
        document.getElementById(`fileInput-${index}`).click();

        uploadedFiles.forEach((file) =>{   
            if (addRecentFiles) {  // Check if addRecentFile is defined
           addRecentFiles({
             name: file.name,
             lastModified: new Date(file.lastModified).toLocaleDateString(),
             timestamp: new Date(),
           });
         } else {
           console.error("addRecentFile is not defined");
         }
   });

    }

    const handleViewFile = (file)=>{
        const fileURL = URL.createObjectURL(file);
        const fileType = file.type;

        if(fileType.startsWith("image/")){
            window.open(fileURL)
        }else if(fileType.startsWith("video/")){
            window.open(fileURL)
        }else if(fileType ==="application/pdf"){
            window.open(fileURL)
        }else if(fileType ==="application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            fileType === "application/msword" ||
            fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            fileType === "application/vnd.ms-excel"
        ){
            window.open(fileURL)
        }else{
            alert("File type not sopported for preview") 
        }
    }


  return (
    <div>
        
    <div style={{ marginTop: "2em", display: "flex", justifyContent: "center"}}>
        <form onSubmit={handleOnSubmit} style={{ border: "1px solid black",borderRadius: "25px", margin: "1em", padding: "1em"}}>
            <input type='file' 
            onChange={handleOnChange}  multiple ></input>
            <button type='submit' style={{borderRadius:"25px"}}>Upload</button>
        </form>
       
    </div>
        <div style={containerStyle} >
         <ol>
            {uploadedFiles?.map((file,index)=>(
                // <li key={index}>File name: {file.name}, Last Modified: {new Date(file.lastModified).toLocaleDateString()}
                //  </li>
                <li key={index} style={{margin:"5px"}}>
                    <div className="card w-50">
        <div className="card-body">  
           <h5 className="card-title">File name: {file.name}</h5>
           <p className="card-text">Last Modified: {new Date(file.lastModified).toLocaleDateString()}</p>
      <div>  
    <button  className="btn btn-primary ms-1" onClick={() => handleDelete(index)}>Delete</button>
    <div  className="btn">
        <input
        type='file'
        id={`fileInput-${index}`}
        multiple
        onChange={e=>handleFileUpload(e,index)}
        style={{ display: "none" }}
        />
        <button className="btn btn-primary " onClick={()=>handleUpdateFile(index)}>Update</button>
        <ol>
            {uploadedFiles?.map((file,index)=> { 
                <li key={index} >{file.name}</li>
            })}
        </ol>

    </div>
    <button  className="btn btn-primary ms-1" onClick={()=>handleViewFile(file)}>View</button>
    </div>
  </div>
</div>
                </li>
            ))}
        </ol>
    </div>
    </div>
  )
}

export default FileUpload