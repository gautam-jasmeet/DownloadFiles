import React from 'react'
import "./ViewFiles.css"


function ViewFiles({file}) {
    const handleViewFile = (file) => {
    
        const fileURL = `http://srv617987.hstgr.cloud:8000${file.fileUrl}`; // Ensure full path
      const fileExtension = file.fileUrl.split('.').pop().toLowerCase();
      
      // console.log(fileURL);
        // console.log(fileExtension);
      
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fileExtension)) {
          // Image files
          window.open(fileURL);
        } else if (['mp4', 'avi', 'mov', 'wmv', 'mkv'].includes(fileExtension)) {
          // Video files
          window.open(fileURL);
        } else if (fileExtension === 'pdf') {
          // PDF files
          window.open(fileURL);
        } else if (
          ['doc', 'docx', 'xls', 'xlsx'].includes(fileExtension)
        ) {
          // Word/Excel files
          window.open(fileURL);
        } else {
          alert('File type not supported for preview');
        }
      
        // console.log(file);
       
        
        
      };
  return (
    <div className="w-100">
 <button className="btn btn-primary card_btn "
 onClick={() => handleViewFile(file)}>
         View
     </button>
    </div>
  )
}

export default ViewFiles