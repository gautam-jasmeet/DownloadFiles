import { useState,useEffect,useContext } from "react";
import axios from "axios";
import { AppContext } from "../appContext/AppContext";

function useGet(url){
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);

    const {token} = useContext(AppContext);
    
     //  Memoizing the headers to prevent re-triggering the effect unnecessarily
    //  const headers = useMemo(()=>{
    //     return {
    //         Authorization:`Bearer ${token}`
    //     }
    //  },[token])

     useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get(url,{
                    headers:{
                         Authorization:`Bearer ${token}`
                    }
                })
                setData(response.data);
                setLoading(false);
                setError(null);
            }catch(error){
                setError(`Error fetching data from ${url}: ${error.message}`);
                setLoading(false);
            }
        }
        fetchData();
     },[url,token])

     return {data,loading,error}
}

export default useGet;
