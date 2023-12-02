import axios from "axios";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

export default function My_WriteReview()
{
    const { mywriterw } = useOutletContext();
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    //console.log(mywriterw);
    const deletereview = (tradeId) =>{
        console.log(tradeId);
         let result = window.confirm('정말 삭제하시겠습니까?');
         if(result==true)
         {
            axios.delete('/api/reviews/'+tradeId,{
                headers: { 
                  'Authorization' : `Bearer ${actoken}`,
                  'Auth' : retoken }
             }).then(response=>{
                console.log(response);
                if(response.status=='200')
                {
                    alert('리뷰삭제가 완료되었습니다');
                    window.location.replace('/my-page/my-write-review');
                }
             }).catch(error=>{
                console.log(error);
                if(error.response.data.code=='401')
                {
                    alert('접근 권한이 없습니다');
                }
                else if(error.response.data.code=='404')
                {
                    alert('리뷰가 작성되지 않았습니다');
                }
                else{
                    alert('다시 시도해 주세요');
                }
             })
         }
    }
    if(!mywriterw) return null;

    return(
        <div className="review-wrap">
            <div className="review-top">
                <h2>작성한 리뷰</h2>
            </div>
            <div className="review-btm">
                {mywriterw.data.reviewList.map((item, index) => {
                    return (
                        <div className="onereview" key={index}>
                             {/* 삭제할 리뷰의 게시물 id전달 */}
                            <DeleteBtn onClick={()=>{deletereview(item.tradeId)}}>리뷰 삭제</DeleteBtn>
                            <div className="reviewtitle">닉네임 : {item.writer}</div>
                            <div className="reviewcontent">리뷰내용 : {item.content}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

let DeleteBtn = styled.button`
width:15vh;
border-radius: 5px;
background-color: black;
color:white;
margin-left : 50vw;
transition: all 0.3s;
    &:hover{
        background-color: rgb(66, 66, 253);
    }
`