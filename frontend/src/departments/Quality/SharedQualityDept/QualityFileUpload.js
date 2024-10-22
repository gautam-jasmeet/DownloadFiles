import {useState,useContext} from 'react'
import axios from 'axios';
import { AppContext } from '../../../appContext/AppContext';
import "../../sharedDept/FileUpload.css"

function QualityFileUpload() {
    const [files, setFiles] = useState([]);
    const [fileName, setFileName] = useState('');
    const [fileVersion, setFileVersion] = useState('');
    const [fileNumber, setFileNumber] = useState('');
    const [category, setCategory] = useState("");
    const [departmentName, setDepartmentName] = useState('');
    const [message, setMessage] = useState('');
    const [showUploadForm, setShowUploadForm] = useState(false);

    const accessibleDepartments = [ 'Quality', 'FQC', 'IQC', 'IPQC'];
    const accessibleCategories = ['Policies', 'Form Format', 'Work Instructions & SOP'];
    const [filteredCategories,setFilteredCategories] = useState(accessibleCategories)

    const { token } = useContext(AppContext);


    // Handle accessibleCategories change
    const handleCategoryChange = (e)=>{
        const selectedDepartment = e.target.value
        setDepartmentName(selectedDepartment)
        if(selectedDepartment === 'Quality' ){
            setFilteredCategories(['Policies', 'Form Format']) 
        }else if(["FQC","IQC","IPQC"].includes(selectedDepartment)){
            setFilteredCategories([ 'Work Instructions & SOP'])
        }
    }

    // Handle file upload
const handleOnChange = (e) => {
    const selectedFile = Array.from(e.target.files);
    setFiles(selectedFile);
    setFileName(e.target.files[0].name); // Automatically set the first file name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files || !fileVersion || !fileNumber || !category || !departmentName ) {
      setMessage('Please fill in all fields and select a file');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
      formData.append('filename', fileName); // Use file name from the file itself
      formData.append('fileVersion', fileVersion);
      formData.append('fileNo', fileNumber);
      formData.append('category', category);
      formData.append('department', departmentName);
    });

    try {
      const response = await axios.post('http://srv617987.hstgr.cloud:8080/documents/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Ensure content type is set correctly
        },
      });
      if (response.status === 201) {
        setMessage('File uploaded successfully');
        
        

        setFiles([]); // Clear files after upload
        setFileName('');
        setFileVersion('');
        setFileNumber('');
        setCategory('')
        setDepartmentName('');

           // Trigger the onFileUpload callback to refresh the list
        //    if (onFileUpload) {
        //     onFileUpload();  // Notify the parent component about the file upload
        //   }
          
      } else {
        setMessage('File upload failed');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      setMessage(`File upload failed: ${err.message}`);
    }
  };

  // to show/hide upload form
const handleShowuploadbutton = ()=>{
    setShowUploadForm(!showUploadForm);
  }

  return (
    <div style={{position:'sticky',top:"4rem"}}>
         
       <div className='form'>
       
        <button
        className='btn btn-primary form_btn'
        onClick={handleShowuploadbutton}
        >
          {showUploadForm ? 'Add Document' : 'Add Document'}
        </button>
       

      {showUploadForm  ? (
        <form className='form_form w-75 '
          onSubmit={handleSubmit}
        >
         
          <h5 className='form_h5'>File Upload</h5>
          <div className="form-group">
            <label>Select File:</label>
            <input className="form-control border border-black" type="file" multiple onChange={handleOnChange} />
          </div>

          <div className="form-group">
            <label>File Name:</label>
            <input className="form-control border border-black" type="text" value={fileName} 
            onChange={(e) => setFileName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>File Version:</label>
            <input
              className="form-control border border-black"
              type="text"
              value={fileVersion}
              onChange={(e) => setFileVersion(e.target.value)}
              placeholder="e.g. v1.0"
              required
            />
          </div>
          <div className="form-group">
            <label>File Number:</label>
            <input
              className="form-control border border-black"
              type="text"
              value={fileNumber}
              onChange={(e) => setFileNumber(e.target.value)}
              placeholder="e.g.  AB-123 or 123"
              required
            />
          </div>
          <div className="form-group">
            <label>Department Name:</label>
             <select
            className="form-control border border-black" 
            value={departmentName} 
            onChange={handleCategoryChange} required>
               <option value="">Select Department</option> 
                  {accessibleDepartments.map((dept) => (
                 <option key={dept} value={dept}>
                   {dept}
                 </option>
               ))}
             </select>
           </div>

             <div className="form-group">
            <label>File Categories:</label>
             <select
            className="form-control border border-black" 
            value={category} onChange={(e) => setCategory(e.target.value)} required>
               <option value="">Select Category</option> 
                  {filteredCategories.map((cat) => (
                 <option key={cat} value={cat}>
                   {cat}
                 </option>
               ))}
             </select>
           </div> 

          
          
          <button className="btn btn-primary form_btn_upload" type="submit">Upload</button>
        </form> 


       ) :(
        <></>
        
      )}
       <div style={{ marginTop: '10px', position:"sticky", top:"43rem",zIndex:"997" }}>
            {message && <p className='alert alert-success'>{message}</p>}
          </div>

      </div>

       </div>
  )
}

export default QualityFileUpload