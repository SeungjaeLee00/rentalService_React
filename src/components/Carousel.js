import { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useRef } from 'react';
import arrowright from '../assets/img/arrow-right.png';
import arrowleft from '../assets/img/arrpw-left.png'
export default function Carousel({ carouselList }) {
    const slideRef = useRef(null);
    const [currentImgIdx, setCurrentImgIdx] = useState(0);
    const IMG_WIDTH = 800;
    const slideRange = currentImgIdx * IMG_WIDTH;

    useEffect(() => {
        slideRef.current.style.transition = "all 1s ease-in-out";
        slideRef.current.style.transform = `translateX(-${slideRange}px)`;
        let time = setTimeout(()=>{
            clearInterval(time);
            if (currentImgIdx == 1) setCurrentImgIdx(currentImgIdx -1);
            if (currentImgIdx == 0) setCurrentImgIdx(currentImgIdx +1);
        },4500)
    }, [currentImgIdx]);

    const moveToNextSlide = () => {
        if (currentImgIdx == 1) return;
        setCurrentImgIdx(currentImgIdx + 1);
        
    }
    const moveToPrevSlide = () => {
        if (currentImgIdx == 0) return;
        setCurrentImgIdx(currentImgIdx - 1);
    };


    return (
        <Container>
            <LeftBtn onClick={moveToPrevSlide}></LeftBtn>
            <Wrapper>
                <SlideWrapper ref={slideRef}>
                    <Img >
                        <div className='dashboard-right'>
                            <div className='dashboard-title'>
                                <h1 style={{ fontWeight: "bold", fontSize: "50px", color:"blue" }}>Billim</h1>
                            </div>
                            <div style={{ marginTop: "20px" }} className='dashboard-decoration'>
                                <div style={{ marginBottom: "50px", fontSize:"30px" }}>
                                    <p>언제어디서든지 상품을</p> <br/><p><span style={{color:"blue",fontSize:"35px",fontWeight:"bold"}}>대여</span> 해주고 
                                     <span style={{color:"blue",fontSize:"35px",fontWeight:"bold"}}> 대여</span> 받을 수 있는 서비스입니다.</p>
                                    </div>
                            </div>
                        </div>
                    </Img>
                    <Img>
                        <div className='dashboard-right'>
                            <div className='dashboard-title'>
                                <h1 style={{ fontWeight: "bold", fontSize: "50px",color:"blue" }}>Billim</h1>
                            </div>
                            <div style={{ marginTop: "20px" }} className='dashboard-decoration'>
                                <div style={{ marginBottom: "50px", fontSize:"30px" }}><p>Billim이 처음이시라면?</p><br/><a>서비스 이용방법 보러가기</a></div>
                            </div>
                        </div>
                    </Img>
                </SlideWrapper>
            </Wrapper>
            <RightBtn onClick={moveToNextSlide}></RightBtn>
        </Container>
    )
}
const Container = styled.div`
display:flex;
margin-left:200px;
`

const Wrapper = styled.div`
width:800px;
height:200px;
overflow:hidden;
margin:0px 80px;
`;
const SlideWrapper = styled.div`
display:flex;
width:100%;
height:100%;
`;
const Img = styled.div`
width:800px;
height:200px;
background-position: 50% 50%;  // 가운데로 보내고
background-size: contain;	   // 아래의 코드랑 같이 쓰면 한개의 이미지가 나옴
background-repeat: no-repeat;
flex: none;	  				  // 이 속성을 넣어야 화면에 1개씩 보여진다.
`;

let LeftBtn = styled.button`
margin-top:70px;
background-image:url(${arrowleft});
background-size: 100%;  
width:40px;
height:40px;
display:inline-block;
border:none;
opacity:.2;
`
let RightBtn = styled.button`
margin-top:70px;
background-image:url(${arrowright});
background-size: 100%;  
width:65px;
height:65px;
display:inline-block;
border:none;
opacity:.2;
`