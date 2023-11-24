import axios from "axios";
import { useState } from "react";

export default function FetchMyInfo()
{

    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    const [myinfo, setMyInfo] = useState();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const fetchMyInfo = async () => {
        try {
            setError(null);
            setLoading(true);
            const response = await axios.get('/members/my-profile', {
                headers: { Authorization: `Bearer ${actoken}` },
                headers: { Auth: retoken }
            })
            console.log("내정보조회성공");
            setMyInfo(response.data.result.data);
            setLoading(false);
        }
        catch (e) {
            console.log(e);
            setError(e);
        }
    }
    fetchMyInfo();
    if(loading) return "loading";
    if(error) return error;
    if(!myinfo) return null;

    return myinfo
}
