import React from 'react'

function DumyFileUpload() {
   const groupFilesByCategory = (files) => {
        const groupedFiles = {};
        files.forEach((file) => {
          const category = file.category || 'Other';
          if (!groupedFiles[category]) {
            groupedFiles[category] = [];
          }
          groupedFiles[category].push(file);
        });
        return groupedFiles;
      };
  return (
    <div>
      <div>
      if (fileExtentiopn.startsWith('image/')) {
      window.open(fileURL);
    } else if (fileExtentiopn.startsWith('video/')) {
      window.open(fileURL);
    } else if (fileExtentiopn === 'application/pdf') {
      window.open(fileURL);
    } else if (
      fileExtentiopn === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileExtentiopn === 'application/msword' ||
      fileExtentiopn === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      fileExtentiopn === 'application/vnd.ms-excel'
    ) {
      window.open(fileURL);
    } else {
      alert('File type not supported for preview');
    }

      </div>
    </div>
  )
}

export default DumyFileUpload