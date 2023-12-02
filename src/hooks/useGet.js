import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

// axios.get을 사용할때 훅
export default function useGet(url)
{
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    const [data,setData] = useState(); // api 데이터 
    const [loading,setLoading] = useState(false); // 데이터 로딩 상태 
    const [error, setError] = useState(false); // 에러 발생 상태 
    const getData= async()=>{
        setLoading(true); //로딩시작
        try{
            const response = await axios.get(url,{
                headers: { 'Authorization' : `Bearer ${actoken}`,
                'Auth' : retoken }
            });
            console.log(response);
            setData(response.data);
        }catch(error){
            setError(true);
        }
        setLoading(false);
    }
    useEffect(()=>{
        getData();
    }, [url])
    
    return {data, loading, error};
}