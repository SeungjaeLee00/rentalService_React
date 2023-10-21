import { useOutletContext } from 'react-router-dom';
import '../../style/MyReview.css'
import styled from 'styled-components';
import axios from 'axios';

function My_Review() {
    const { myreview } = useOutletContext();
    console.log(myreview);
    // const deletereview = () =>{
    //     axios.delete('/api/reviews/')
    // }
    return (
        <div className="review-wrap">
            <div className="review-top">
                <h2>받은 리뷰</h2>
            </div>
            <div className="review-btm">
                {myreview.map((item, index) => {
                    return (
                        <div className="onereview">
                            <DeleteBtn>리뷰 삭제</DeleteBtn>
                            <div className="reviewtitle">닉네임 : {item.writer}</div>
                            <div className="reviewcontent">리뷰내용 : {item.content}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default My_Review;


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