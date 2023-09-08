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
  let dispatch = useDispatch();
  

  const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [itemtitle, setItemTitle] = useState('');
  const [itemcontent, setItemContent] = useState('');
  const [itemcategoryName, setItemCategoryName] = useState('');
  const [itemname, setItemName] = useState('');
  const [itemprice, setItemPrice] = useState();
  const [itemquantity, setItemQuantity] = useState();

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  }
  const saveTitle = (e) => {
    setItemTitle(e.target.value);
  }
  const saveContent = (e) => {
    setItemContent(e.target.value);
  }
  const saveCategory = (e) => {
    setItemCategoryName(e.target.value);
  }
  const saveName = (e) => {
    setItemName(e.target.value);
  }
  const savePrice = (e) => {
    setItemPrice(e.target.value);
  }
  const saveQuantity = (e) => {
    setItemQuantity(e.target.value);
  }
  //사용자의 데이터를 서버에 전달하기 위해 Form형식으로 데이터를 생성
  const formData = new FormData();
  formData.append('title', itemtitle);
  formData.append('content', itemcontent);
  formData.append('categoryName', itemcategoryName);
  formData.append('itemCreateRequestDto.name', itemname);
  formData.append('itemCreateRequestDto.price', itemprice);
  formData.append('itemCreateRequestDto.quantity', itemquantity);
  formData.append('multipartFiles', file);
  


  if (!isAuthenticated) {
    window.location.replace("/loginpage")
  }

  return (
    <div>
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
            <input type='file' onChange={saveFile} />
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
              placeholder="  게시글의 제목을 입력해주세요."
              onChange={saveTitle}
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
                onChange={saveCategory}
                defaultValue={"none"}
                inputProps={{
                  name: "category",
                  id: "uncontrolled-native",
                }}
              >

                <option onClick={() => { saveCategory("가전제품") }} >가전제품</option>
                <option onClick={() => { saveCategory("생활용품") }} >생활용품</option>
                <option onClick={() => { saveCategory("악기") }} >악기</option>
                <option onClick={() => { saveCategory("완구") }} >완구</option>
                <option onClick={() => { saveCategory("의류") }} >의류</option>
                <option onClick={() => { saveCategory("기타") }} >기타</option>
              </NativeSelect>
            </FormControl>
          </div>

          <br />
          <HorizonLine />
          <br />

          <div style={{ display: "flex" }}>
            <h5>상품이름</h5>
            <p style={{ color: 'red' }}>*</p>
            <br />
            <input
              type="text"
              placeholder="상품의 이름을 입력해주세요"

              onChange={saveName}
              style={{
                background_color: "transparent",
                border: "2px solid rgba(0, 0, 0, 0.23)",
                borderRadius: "7px", marginLeft: "80px",
                width: "650px"
              }}
            />
          </div>

          <HorizonLine />
          <br />

          <div style={{ display: "flex" }}>
            <h5>가격</h5>
            <p style={{ color: 'red' }}>*</p>
            <br />
            <input
              type="text"
              placeholder="  ₩ 숫자만 입력해주세요."

              onChange={savePrice}
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

              placeholder="  여러 장의 상품 사진과 구입 연도, 브랜드, 사용감, 하자 유무 등 대여자에게 필요한 정보를 꼭 포함해주세요. (10자 이상)&#13;&#10;"
              onChange={saveContent}
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

              placeholder='  1'
              onChange={saveQuantity}
              style={{
                background_color: "transparent",
                border: "2px solid rgba(0, 0, 0, 0.23)",
                borderRadius: "7px", marginLeft: "80px"
              }}
            />
            <p style={{ marginLeft: "15px", }}> 개</p>
          </div>

          <button className='buttonstyle' style={{ fontSize: '20px', width: "100px", height: "50px" }}
            onClick={() => {
              axios.post('http://13.125.98.26:8080/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${actoken}` },
                headers: { Auth: retoken },
              })
                .then(response => {
                  console.log("성공");
                })
                .catch(error => {
                  console.log(error.response.data.result);
                })

              navigate("/");
            }}> 등록하기 </button>
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
};

export default Upload_Item;
