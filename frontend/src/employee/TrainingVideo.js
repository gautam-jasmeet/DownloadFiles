import React, { useEffect,useState,useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../appContext/AppContext';

function TrainingVideo() {
    const [allVideo, setAllVideo] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);

    const {token, department} = useContext(AppContext)
    // console.log( department);
    

    useEffect(()=>{
        const fetchAllVideo = async()=>{
            try{
                const response = await axios.get("http://localhost:8080/hr/",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                if(response.status === 200){
                    setAllVideo(response.data)
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchAllVideo();
    },[token])

    console.log(allVideo);

    const filterVideo = allVideo.filter((video)=>video.departmentName === department);

    console.log(filterVideo);
    const handleViewAllVideos = (file)=>{
        const fileURL = `http://localhost:8080${file.videoUrl}`; // Ensure full path
        const fileExtension = file.videoUrl.split('.').pop().toLowerCase();
        if (['mp4', 'avi', 'mov', 'wmv', 'mkv'].includes(fileExtension)) {
          // Video files
          window.open(fileURL);
        } else {
          alert('File type not supported for preview');
        }
   }


   /// video watch completed
   const handleVideoEnd =()=>{

    setIsCompleted(true);
   }
    

  return (
    <div>
        <h4 
        style={{position:"sticky", top:"128px",zIndex:"999", backgroundColor:"var(--main-Dept-header-color)",
        // color:"var(--main-header-color)"
        display:"flex", justifyContent:"center",
        }}
        ><span className='text-center border-bottom border-2 border-dark fw-semibold'>All Training Videos</span></h4>
        {/* List of filtered documents */}
        <ol className='cat_ol mt-4'>
          {filterVideo.length === 0 ? (
            <p className='cat_ol-1'>No files available for the selected category.</p>
          ) : (
            filterVideo.map((file) => (
              <li className='cat_ol-2' key={file.id} style={{ margin: '10px' }}>
                <div className="card w-100 cat_ol-3">
                  <div>
                 <video className="card-img-top" width="100%" height="320px"  controls onEnded={handleVideoEnd}>
                        <source src={`http://localhost:8080${file.videoUrl}`}  type="video/mp4" />
                      </video>
                      {isCompleted && <p className='cat_ol-4'>Video Completed</p>}
                      </div>
                  <div className="card-body cat_ol-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p className="card-title cat_ol-5"><b>Video Name:</b> {file.videoName}</p>
                      <p className="card-text cat_ol-6" style={{ margin: "0" }}><b>Video Version:</b> {file.videoVersion}</p>
                      <p className="card-text cat_ol-7"><b>Video Description:</b> {file.videoDescription}</p>
                    </div>
                    <div>
                     
                    {/* <button className="btn btn-primary card_btn"
                       onClick={() => handleViewAllVideos(file)}>
                        View
                      </button> */}
                    {/* <button className="btn btn-primary card_btn"
                       onClick={() => handleDelete(file.id)}>
                        Delete
                      </button> */}
                      {/* <ViewFiles className="btn card_btn" file={file} /> */}
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ol> 
    </div>
  )
}

export default TrainingVideo