import {useState,useContext, useEffect} from 'react'
import axios from 'axios';
import { AppContext } from '../../../appContext/AppContext';
import "../../sharedDept/FileUpload.css"

function Training() {
  const [files, setFiles] = useState([]);
  const [videoName, setVideoName] = useState('');
  const [videoVersion, setVideoVersion] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  // const [category, setCategory] = useState("");
  const [departmentName, setDepartmentName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);

  const [allVideos, setAllVideos] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
 


  const accessibleDepartments = ['Store', 'HR', 'Production', 'Machine', 'Maintance', 'SOP|WI', 
      'Logistics', 'Quality', 'Calibration', 'FQC', 'IQC', 'IPQC', 'EHS'];

  const { token } = useContext(AppContext);

  // to get all videos
useEffect(()=>{

  const fetchVideos = async () => {
   try{
     const response = await axios.get("http://srv617987.hstgr.cloud:8080/hr/",{
       headers:{
         Authorization:`Bearer ${token}`
       }
     })
     // console.log(response.data);
     if(response.status === 200){
       setAllVideos(response.data)
     }else{
       setError(`Something went wrong. ${response.data.message}` );
     }
   }catch(err){
     setError(`Something went wrong. ${err.message}` );
   }
 }
 fetchVideos();
 },[token, allVideos]);
 // console.log(allVideos);


  // Handle file upload
const handleOnChange = (e) => {
  const selectedFile = Array.from(e.target.files);
  setFiles(selectedFile);
  setVideoName(e.target.files[0].name); // Automatically set the first file name
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!files || !videoName || !videoVersion || !videoDescription || !departmentName ) {
    setError('Please fill in all fields and select a file');
    return;
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append('video', file);
    formData.append('videoName', videoName); // Use file name from the file itself
    formData.append('videoVersion', videoVersion);
    formData.append('videoDescription', videoDescription);
    // formData.append('category', category);
    formData.append('departmentName', departmentName);
  });

  try {
    const response = await axios.post('http://srv617987.hstgr.cloud:8080/hr/training-video', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data', // Ensure content type is set correctly
      },
    });
    if (response.status === 201) {
      setMessage('File uploaded successfully');
      
      

      setFiles([]); // Clear files after upload
      setVideoName('');
      setVideoVersion('');
      setVideoDescription('');
      // setCategory('')
      setDepartmentName('');
    }
  } catch (err) {
    console.error('Error uploading file:', err);
    setError(`File upload failed: ${err.message}`);
  }
};




// to show/hide upload form
const handleShowuploadbutton = ()=>{
  setShowUploadForm(!showUploadForm);
}

const handleViewAllVideos = (file)=>{
     const fileURL = `http://srv617987.hstgr.cloud:8080${file.videoUrl}`; // Ensure full path
     const fileExtension = file.videoUrl.split('.').pop().toLowerCase();
     if (['mp4', 'avi', 'mov', 'wmv', 'mkv'].includes(fileExtension)) {
       // Video files
       window.open(fileURL);
     } else {
       alert('File type not supported for preview');
     }
}

const filterVideos = (deptName) => {
  if (!deptName) {
    return allVideos;
  }else{
    
    return allVideos.filter((video)=>video.departmentName === deptName);
  }
}
// console.log(filterVideos(selectedDept));

const handleSelectDepartment = (e) => {
  setSelectedDept(e.target.value);
};


const handleDelete = async(Id)=>{
  const confirmDelete = window.confirm('Are you sure you want to delete this video?');
  if(!confirmDelete){
    return;
  }
  try{
    const response = await axios.delete(`http://srv617987.hstgr.cloud:8080/hr/training-video/${Id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    if(response.status === 200){
      const newVideos = allVideos.filter((video)=>video.id !== Id);
      setAllVideos(newVideos);
      setMessage('Video deleted successfully');
    }else{
      setError(`Something went wrong. ${response.data.message}` );
      
    }
  }catch(err){
    console.log(`Error deleting video:${err}`);
    setError(`Something went wrong. ${err.message}` );
  }
}

  return (
  <>
      
    <div style={{display:"flex",flexWrap:"wrap" }}>
    
      {/* Video Upload */}
    <div >
         
    <div className='form' style={{position:'sticky',top:"165px", zIndex:"999"}}>
    
    
     <button
     className='btn btn-primary form_btn'
     onClick={handleShowuploadbutton}
     >
       {showUploadForm ? 'Add Training Video' : 'Add Training Video'}
     </button>
    

   {showUploadForm  ? (
     <form className='form_form w-75'
       onSubmit={handleSubmit}
     >
      
       <h5 className='form_h5'> Upload Training Video</h5>
       <div className="form-group">
         <label>Select Video:</label>
         <input className="form-control border border-black" type="file" multiple onChange={handleOnChange} />
       </div>

       <div className="form-group">
         <label>Video Name:</label>
         <input className="form-control border border-black" type="text" value={videoName} 
         onChange={(e) => setVideoName(e.target.value)} required />
       </div>

       <div className="form-group">
         <label>Video Version:</label>
         <input
           className="form-control border border-black"
           type="text"
           value={videoVersion}
           onChange={(e) => setVideoVersion(e.target.value)}
           placeholder="e.g. v1.0"
           required
         />
       </div>
       <div className="form-group">
         <label>Video's Decription :</label>
         <textarea class="form-control border border-black"
          id="exampleFormControlTextarea1" 
          rows="3"
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)} 
          required
          ></textarea>
       </div>

        <div className="form-group">
         <label>Department Name:</label>
          <select
         className="form-control border border-black" 
         value={departmentName} 
         onChange={(e) => setDepartmentName(e.target.value)} required>
            <option value="">Select Department</option> 
               {accessibleDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
       
       <button className="btn btn-primary form_btn_upload" type="submit">Upload</button>
     </form> 


    ) :(
     <></>
     
   )}
   

   </div>
   </div>



    <div style={{marginTop:"1rem", padding:"10px", height:"100%" }}>
      {/* Category Selection */}
      <div className='cat' style={{position:"sticky", top:"119px",zIndex:"999",
        boxShadow:"0px 1px 3px rgba(0,0,0,0.2)",
        borderRadius:"10px",
        padding:"10px",
        backgroundColor:"aliceblue"
      }}>
        
      <label className="form-label">Select Department :</label>
          <select
         className="form-control border- border-black w-50" 
         value={selectedDept} 
         onChange={(e) => handleSelectDepartment(e)} required>
            <option 
            // className={`nav-link ${selectedDept === 'All' ? 'active' : ''}`}
            // onClick={() => handleSelectDepartment({target:{value:""}})}
            value=""
            >
              All Department
              </option> 
               {accessibleDepartments.map((dept) => (
              <option 
              key={dept} 
              // className={`nav-link ${selectedDept === dept ? 'active' : ''}`}
              // onClick={() => handleSelectDepartment({target:{value:dept}})}
              value={dept}
              >
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* List of filtered documents */}
        <ol className='cat_ol mt-4'>
          {filterVideos(selectedDept).length === 0 ? (
            <p className='cat_ol-1'>No files available for the selected category.</p>
          ) : (
            filterVideos(selectedDept).map((file) => (
              <li className='cat_ol-2' key={file.id} style={{ margin: '10px' }}>
                <div className="card w-100 cat_ol-3">
                  <div className="card-body cat_ol-4" style={{ display: 'flex', justifyContent: 'space-between',flexWrap:"wrap" }}>
                    <div>
                      <p className="card-title cat_ol-5"><b>Video Name:</b><span> {file.videoName} </span></p>
                      <p className="card-text cat_ol-6" style={{ margin: "0" }}><b>Video Version:</b> {file.videoVersion}</p>
                      <p className="card-text cat_ol-7"><b>Video Description:</b> {file.videoDescription}</p>
                    </div>
                    <div>
                    <button className="btn btn-primary card_btn w-75"
                       onClick={() => handleViewAllVideos(file)}>
                        View
                      </button>
                    <button className="btn btn-primary card_btn w-75"
                       onClick={() => handleDelete(file.id)}>
                        Delete
                      </button>
                     
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ol> 
      {/* </div>*/}
      {/* {message && <p className='alert alert-danger'>{message}</p>} */}
    </div>

    </div>
    
    {/* // </div> */}
    <div style={{ marginTop: '10px',  }}>
         {message && <p className='alert alert-success'>{message}</p>}
         {error && <p className='alert alert-danger'>{error}</p>}
       </div>
   
   </>
  )
}

export default Training