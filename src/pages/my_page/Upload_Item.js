import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

import '../../App.css';
import HorizonLine from '../../components/HorizonLine';
import { useAuth } from '../../components/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { additem } from '../../store';
import { ConnectingAirportsOutlined } from '@mui/icons-material';

const Upload_Item = () => {
  let dispatch=useDispatch();
  let itemimage, title, price, contents, count;

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  let [itemimg, setItemImg] = useState("");
  const [itemtitle, setItemTitle] = useState('');
  const [itemcategory, setItemCategory] = useState('');
  const [itemprice, setItemPrice]= useState('');
  const [itemcontent, setItemContent] = useState('');
  const [itemcount, setItemCount] = useState('');


  // const saveBoard = async () => {
  //   await axios.post(`//localhost:3000/board`, board).then((res) => {
  //     alert('등록되었습니다.');
  //     navigate('/itemmain');
  //   });
  // };

  // const saveBoard = (event) => {
  //   event.preventDefault();

  //   const postData = {
  //     // title: title,
  //     // content: content
  //   };

  //   axios.post('http://13.125.98.26:8080/posts', postData)
  //     .then(response => {
  //       setMessage('게시물이 성공적으로 생성되었습니다.');
  //       if ((response.status = 201)) {
  //         return navigate("/itemmain");
  //       }
  //     })

  //     .catch(error => {
  //       console.error('게시물 생성 실패:', error);
  //       setMessage('게시물 생성에 실패하였습니다.');
  //     });
  // };



  const setPreViewImg = (event) => {
    var reader = new FileReader();

    reader.onload = function (event) {
      setItemImg(event.target.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  if (!isAuthenticated) {
    navigate('/loginpage');
  }

  return (
    <div>
      <button onClick={()=>{
        console.log(itemtitle);
        console.log(itemcategory);
        console.log(itemcontent);
        console.log(itemcount);
        console.log(itemprice);
      }}>데이터확인</button>
      {isAuthenticated ? (

        <div style={{ marginTop: "80px", marginLeft: "110px", marginRight: "110px", marginBottom: "80px" }}>
          <div style={{ display: "flex" }}>
            <h3 >기본 정보</h3>
            <p style={{ color: 'red', fontSize: "14px" }}>{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}*필수항목</p>
          </div>
          <p style={{ border: "solid 1px #000000", marginTop: "10px" }}></p>
          <br />

          <div style={{ display: "flex" }}>
            <h5>상품이미지</h5>
            <p style={{ color: 'red' }}>*</p>
            <img src={itemimg} style={{ maxWidth: "500px", marginLeft: "40px" }}></img>
            <input
              type="file"
              id="image"
              accept="img/*"
              value={itemimage}
               />
          </div>

          <br />
          <HorizonLine />
          <br />

          <div style={{ display: "flex" }}>
            <h5>제목</h5>
            <p style={{ color: 'red' }}>*</p>
            <br />
            <input
              type="text"
              name="title"
              placeholder="  상품 제목을 입력해주세요."
              value={title}
              onChange={(e)=>{
                setItemTitle(e.target.value);
              }}
              style={{
                background_color: "transparent",
                border: "2px solid rgba(0, 0, 0, 0.23)",
                borderRadius: "7px", marginLeft: "80px", width: "800px"
              }} />
          </div>

          <br />
          <HorizonLine />
          <br />

          <div style={{ display: "flex" }}>
            <h5>카테고리</h5>
            <p style={{ color: 'red' }}>*</p>
            <FormControl sx={{ minWidth: 200, marginLeft: " 55px" }}>
              <NativeSelect 
                onChange={(e)=>{setItemCategory(e.target.value)}}
                defaultValue={"none"}
                inputProps={{
                  name: "category",
                  id: "uncontrolled-native",
                }}
              >
                
                <option onClick={()=>{setItemCategory("가전제품")}} value={"가전제품"}>가전제품</option>
                <option onClick={()=>{setItemCategory("생활용품")}} value={"생활용품"}>생활용품</option>
                <option onClick={()=>{setItemCategory("악기")}} value={"악기"}>악기</option>
                <option onClick={()=>{setItemCategory("완구")}} value={"완구"}>완구</option>
                <option onClick={()=>{setItemCategory("의류")}} value={"의류"}>의류</option>
                <option onClick={()=>{setItemCategory("기타")}} value={"기타"}>기타</option>
              </NativeSelect>
            </FormControl>
          </div>

          <br />
          <HorizonLine />
          <br />

          <div style={{ display: "flex" }}>
            <h5>가격</h5>
            <p style={{ color: 'red' }}>*</p>
            <br />
            <input
              type="text"
              name="price"
              placeholder="  ₩ 숫자만 입력해주세요."
              value={price}
              onChange={(e)=>{
                setItemPrice(e.target.value);
              }}
              style={{
                background_color: "transparent",
                border: "2px solid rgba(0, 0, 0, 0.23)",
                borderRadius: "7px", marginLeft: "80px"
              }}
            />
            <p style={{ marginLeft: "15px" }}> 원</p>
          </div>

          <br />
          <HorizonLine />
          <br />

          <div style={{ display: "flex" }}>
            <h5> 설명 </h5>
            <p style={{ color: 'red' }}>*</p>
            <br />
            <textarea
              name="contents"
              cols="90"
              rows="5"
              value={contents}
              placeholder="  여러 장의 상품 사진과 구입 연도, 브랜드, 사용감, 하자 유무 등 대여자에게 필요한 정보를 꼭 포함해주세요. (10자 이상)&#13;&#10;"
              onChange={(e)=>{
                setItemContent(e.target.value);
              }}
              style={{
                background_color: "transparent",
                border: "2px solid rgba(0, 0, 0, 0.23)",
                borderRadius: "7px", marginLeft: "80px"
              }}

            ></textarea>
          </div>
          <br />

          <br />
          <HorizonLine />
          <br />

          <div style={{ display: "flex" }}>
            <h5>수량</h5>
            <br />
            <input
              type="text"
              name="count"
              placeholder="  1"
              value={count}
              onChange={(e)=>{
                setItemCount(e.target.value);
              }}
              style={{
                background_color: "transparent",
                border: "2px solid rgba(0, 0, 0, 0.23)",
                borderRadius: "7px", marginLeft: "80px"
              }}
            />
            <p style={{ marginLeft: "15px", }}> 개</p>
          </div>

          <button className='buttonstyle' style={{ fontSize: '20px', width: "100px", height: "50px" }}
            onClick={()=>{
              let temp = { id :4, title:itemtitle, category:itemcategory, price:itemprice, content:itemcontent, date:"2023-08-31", state:"판매중"}
              dispatch(additem(temp));
              navigate('/itemmain')
            }}> 등록하기 </button>
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
};

export default Upload_Item;
