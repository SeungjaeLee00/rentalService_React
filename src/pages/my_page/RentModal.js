import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function RentModal(props) {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

    console.log(actoken);
    console.log(retoken);


    const [tradeinfo, setTradeInfo] = useState();
    const [loadging, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fetchtradeinfo = async () => {
        try {
            setError(null);
            setTradeInfo(null);

            setLoading(true);
            const response = await axios.get('/trades/'+props.tradeid)
            console.log(response.data.result.data);
            setTradeInfo(response.data.result.data);
        }
        catch(e){
            console.log(e);
            setError(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchtradeinfo();
    },[])

    function closeModal() {
        props.closeModal();
    }

    if(loadging) return <div>로딩중...</div>
    if(error) return <div>에러가 발생했습니다</div>
    if(!tradeinfo) return null;

    
    const TradeComplete= ()=>
    {
        console.log(actoken);
        console.log(retoken);
        axios.patch("/trades/trade/"+ props.tradeid,null, {
            headers: { 'Authorization' : `Bearer ${actoken}` },
            headers: { 'Auth' : retoken }
        })
        .then(response=>{
            console.log(response);
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        <div className="RentModal" onClick={closeModal}>
            <div className="RentmodalBody" onClick={(e) => e.stopPropagation()}>
                <button className="RentmodalCloseBtn" onClick={closeModal}>
                    X
                </button>
                <div>
                 <span style={{fontSize:"25px"}}>게시글제목:{props.tradetitle}</span>
                </div>
                <div>
                    <span>대여기간:</span>
                    <span>{tradeinfo.startDate} ~ {tradeinfo.endDate}</span>                    
                </div>
                <button onClick={TradeComplete}>거래 완료</button>
            </div>
        </div>
    )
}