import axios from "axios";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";

export default function TradeModal(props) {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    function closeModal() {
        props.closeModal();
    }

    //api의 date에 맞게 형식변환함수

    function windowtransDate(date)
    {
        //console.log(date);
        let result = date.split(".");
        //console.log(result);
        let result2;
        //달이 1~9월 즉, 한자릿수이면 달앞에 0을 붙여준다. -> 01, 02 ...
        if(Number(result[1])<10)
        {
            result2 = result[0]+".0"+result[1]+"."+result[2];
        }
        else result2 = result[0]+"."+result[1]+"."+result[2];
        //console.log(result2);
        //형식에서 공백제거 
        let result3 = result2.split(" ");
        //console.log(result3)
        let result4 = result3[0]+result3[1]+result[2];
        //console.log(result4);
        let result5 = result4.split(" ");
        //console.log(result5);
        let result6 = result5[0]+result5[1];
        //console.log(result6);
        return result6;
    }
     
    // function macTransDate(date){
    //     let result = date.split("/").reverse();
    //     let temp = result[1];
    //     result[1]=result[2];
    //     result[2]=temp;
    
    //     if (Number(result[1]) < 10){
    //         result[1] = "0" + result[1]
    //     }
    //     let fin_result = result[0] + "." + result[1] + "." + result[2]
    //     return fin_result;
    // }

    function tradesProduce()
    {
        //console.log(startDate);
        //console.log(endDate);

        const dataToSend={
            borrowerName : props.borrowerName,
            startDate : startDate.toLocaleDateString(),
            endDate : endDate.toLocaleDateString(),
        }


        //console.log(dataToSend.startDate);
        //console.log(dataToSend.endDate);

        dataToSend.startDate=windowtransDate(dataToSend.startDate);
        dataToSend.endDate=windowtransDate(dataToSend.endDate);
        // dataToSend.startDate = macTransDate(dataToSend.startDate);
        // dataToSend.endDate = macTransDate(dataToSend.endDate);

        axios.post('/api/trades/'+props.postId,dataToSend,{
            headers: { 'Authorization' : `Bearer ${actoken}`,
                'Auth' : retoken }
          })
          .then(response=>{
            console.log("거래생성완료");
            alert("거래가 시작되었습니다");
            //window.location.replace("my-page/chats");
          })
          .catch(error=>{
            if (error.response.data.code == '511') {
                alert('로그인이 만료되어 로그인 페이지로 이동합니다');
                window.location.replace('/loginpage');
              }
            else if(error.response.data.code=='409')
            {
                alert('해당 게시물에 대한 거래가 이미 진행중입니다');
            }
            console.log(error)
        })
    }


    return (
        <div className="Modal" onClick={closeModal}>
            <div className="modalBody" onClick={(e) => e.stopPropagation()}>
                <button id="modalCloseBtn" onClick={closeModal}>
                    X
                </button>
                <div style={{ marginTop: "25px" }}><span style={{fontWeight:"bold", fontSize:"20px"}}>{props.borrowerName}</span>님과 거래하기{props.senderNickname}</div>
                <div style={{ marginTop: "40px" }}>
                    <span style={{marginRight:"15px", fontWeight:"bold"}}>대여 시작일</span>
                    <ReactDatePicker dateFormat="yyyy.MM.dd" selected={startDate}  startDate={startDate} endDate={endDate}
                    onChange={date => setStartDate(date)}></ReactDatePicker>
                </div>
                <div style={{ marginTop: "10px" }}>
                    <span style={{marginRight:"15px", fontWeight:"bold"}}>대여 종료일</span>
                    <ReactDatePicker dateFormat="yyyy.MM.dd" selected={endDate} startDate={startDate} endDate={endDate}
                     onChange={date => setEndDate(date)}>
                    </ReactDatePicker></div>
                <button className="button" onClick={()=>{
                    tradesProduce();
                }} style={{ marginTop: "40px", marginRight:"50px"}}>대여해주기</button>
            </div>
        </div>
    )
}