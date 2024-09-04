import React, { createContext,useState } from 'react'

const RecentFilesContext = createContext();

export const  RecentFilesProvider= ({children})=> {
    const [recentFiles, setRecentFiles] = useState([]);
    const addRecentFiles = (file) => {
        setRecentFiles((prevFiles) => [file, ...prevFiles.slice(0, 4)]);
    }
  return (
    <RecentFilesContext.Provider value={{recentFiles, addRecentFiles}}>
        {children}
    </RecentFilesContext.Provider>
  );
};

export default RecentFilesContext