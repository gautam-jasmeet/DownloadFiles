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
    <div>DumyFileUpload</div>
  )
}

export default DumyFileUpload