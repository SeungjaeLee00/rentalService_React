import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// axios.get을 사용할때 훅
export default function useGet(url)
{
    const location = useLocation();
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
            console.log(response.data);
            setData(response.data);
        }catch(e){
            // if (e.response.data.code == '511') {
            //     console.log(e);
            //     if(location.pathname!="/loginpage")
            //     {
            //         alert('로그인이 만료되어 로그인 페이지로 이동합니다');
            //     }
            //     window.location.replace('/loginpage');
            // }
            console.log(error);
            setError(true);
        }
        setLoading(false);
    }
    useEffect(()=>{
        getData();
    }, [url])
    
    return {data, loading, error};
}