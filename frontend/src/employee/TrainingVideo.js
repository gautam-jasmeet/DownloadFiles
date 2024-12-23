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
                const response = await axios.get("http://srv617987.hstgr.cloud:8080/hr/",{
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
    },[token,allVideo])


    // console.log(allVideo);

    const filterVideo = allVideo.filter((video)=>video.departmentName === department);


   /// video watch completed
   const handleVideoEnd =()=>{

    setIsCompleted(true);
   }
    

  return (
    <div>
        <h4  className='p-3'
        style={{position:"sticky", top:"60px",zIndex:"999", backgroundColor:"var(--main-Dept-header-color)",
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
                        <source src={`http://srv617987.hstgr.cloud:8080${file.videoUrl}`}  type="video/mp4" />
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