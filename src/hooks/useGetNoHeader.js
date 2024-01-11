import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


export default function useGetNoHeader(url)
{
    const [data,setData] = useState(); // api 데이터 
    const [loading,setLoading] = useState(false); // 데이터 로딩 상태 
    const [error, setError] = useState(false); // 에러 발생 상태 
    const getData= async()=>{
        setLoading(true); //로딩시작
        try{
            const response = await axios.get(url)
            //console.log(response.data);
            setData(response.data);
        }catch(error){
            // if(error.response.data.code==511) 
            // {
            //     alert('로그인이 만료되어 로그인 페이지로 이동합니다');
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