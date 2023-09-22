import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import HorizonLine from '../../components/HorizonLine';
import { useAuth } from '../../components/AuthContext';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

let Button = styled.button`
  color:black;
  border-Radius:30px;
  font-Size:20px;
  width:100px;
  height:50px;
  border:none;
  font-Weight:bold;
  background-Color:rgb(220, 220, 220);
  &:hover{
    transform: translateY(-2px);
    transition: 1s;
    color:blue;
}
`;


const Upload_Item = () => {

  const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;
  const { isAuthenticated } = useAuth();
  const [file, setFile] = useState();
  const [itemtitle, setItemTitle] = useState('');
  const [itemcontent, setItemContent] = useState('');
  const [itemcategoryName, setItemCategoryName] = useState('');
  const [itemname, setItemName] = useState('');
  const [itemprice, setItemPrice] = useState();
  const [itemquantity, setItemQuantity] = useState();


  //state에는 마이페이지에서 게시글 수정버튼 눌렀을때 게시물의 id가 담깁니다.
  const { state } = useLocation();

  console.log(state);
  console.log(typeof (state));

  const [error, setError] = useState(null);

  const updatePost = async () => {
    try {
      setError(null);
      const response = await axios.get('/posts/' + state);
      console.log(response.data.result.data);
      let copy = response.data.result.data;
      setItemTitle(copy.title);
      setItemContent(copy.content);
      setItemCategoryName(copy.categoryName);
      setItemName(copy.item.name);
      setItemPrice(copy.item.price);
      setItemQuantity(copy.item.quantity);
    } catch (e) {
      setError(e);
    }
  }
  useEffect(() => {
    //state가 null이 아니면 마이페이지에서 게시글 수정버튼을 누른것
    if (state >= 0) {
      updatePost();
    }
  }, [])



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

  function produce() {
    //사용자의 데이터를 서버에 전달하기 위해 Form형식으로 데이터를 생성
    //게시글생성
    if (state == null) {
      const formData = new FormData();
      formData.append('title', itemtitle);
      formData.append('content', itemcontent);
      formData.append('categoryName', itemcategoryName);
      formData.append('ItemCreateRequestDto.name', itemname);
      formData.append('ItemCreateRequestDto.price', itemprice);
      formData.append('ItemCreateRequestDto.quantity', itemquantity);
      formData.append('multipartFiles', file);
      axios.post('http://13.125.98.26:8080/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${actoken}` },
        headers: { Auth: retoken },
      })
        .then(response => {
          console.log("게시물생성성공");
          //window.location.replace("/");
        })
        .catch(error => {
          console.log(error.response.data.result);
        })
    }
    else //게시글 수정 
    {
      const formData = new FormData();
      formData.append('title', itemtitle);
      formData.append('content', itemcontent);
      formData.append('categoryName', itemcategoryName);
      formData.append('ItemUpdateRequestDto.name', itemname);
      formData.append('ItemUpdateRequestDto.price', itemprice);
      formData.append('ItemUpdateRequestDto.quantity', itemquantity);
      formData.append('multipartFiles', file);
      axios.patch("/posts/" + state, formData, {
        headers: { 'Content-Type': 'multipart/form-data'},
        headers: { 'Authorization': `Bearer ${actoken}`},
        headers: { 'Auth' : retoken },
      })
        .then(response => {
          console.log("수정성공");
          //window.location.replace("/");
        })
        .catch(error => {
          console.log(error.result.data.result);
        })
    }


  }

  if (!isAuthenticated) {
    window.location.replace("/loginpage")
  }

  return (
    <div>
      {isAuthenticated ? (
        <div style={{ marginTop: "10px", marginLeft: "110px", marginRight: "110px", marginBottom: "80px" }}>
          <div style={{ display: "flex" }}>
            <h3 >기본 정보</h3>
            <p style={{ color: 'red', fontSize: "14px" }}>{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}*필수항목</p>
          </div>
          <p style={{ border: "solid 1px #000000", marginTop: "10px" }}></p>
          <br />
          <Input itemtitle={itemtitle} itemcontent={itemcontent} itemcategoryName={itemcategoryName} itemname={itemname} itemprice={itemprice}
            itemquantity={itemquantity} saveFile={saveFile} saveTitle={saveTitle} saveCategory={saveCategory} saveName={saveName} savePrice={savePrice}
            saveContent={saveContent} saveQuantity={saveQuantity} />

          <Button className='buttonstyle' style={{ fontSize: '20px', width: "100px", height: "50px" }}
            onClick={produce}> 완료 </Button>
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
};

function Input({ itemtitle, itemcontent, itemcategoryName, itemname, itemprice, itemquantity, saveFile, saveTitle, saveCategory, saveName, savePrice, saveContent, saveQuantity }) {
  const [temp, setTemp] = useState("게시글제목");
  return (
    <>
      <div style={{ display: "flex" }}>
        <h5>상품이미지</h5>
        <p style={{ color: 'red' }}>*</p>
        <input type='file' onChange={saveFile} />
      </div>
      <HorizonLine />
      <div style={{ display: "flex" }}>
        <h5>제목</h5>
        <p style={{ color: 'red' }}>*</p>
        <input
          type="text"
          placeholder="  게시글의 제목을 입력해주세요."
          value={itemtitle}
          onChange={saveTitle}
          style={{
            background_color: "transparent",
            border: "2px solid rgba(0, 0, 0, 0.23)",
            borderRadius: "7px", marginLeft: "80px", width: "800px"
          }} />
      </div>
      <HorizonLine />
      <div style={{ display: "flex" }}>
        <h5>카테고리</h5>
        <p style={{ color: 'red' }}>*</p>
        <FormControl sx={{ minWidth: 200, marginLeft: " 55px" }}>
          <NativeSelect
            onChange={saveCategory}
            defaultValue={"none"}
            value={itemcategoryName}
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
      <HorizonLine />

      <div style={{ display: "flex" }}>
        <h5>상품이름</h5>
        <p style={{ color: 'red' }}>*</p>
        <br />
        <input
          type="text"
          placeholder="상품의 이름을 입력해주세요"
          value={itemname}
          onChange={saveName}
          style={{
            background_color: "transparent",
            border: "2px solid rgba(0, 0, 0, 0.23)",
            borderRadius: "7px", marginLeft: "50px",
            width: "650px"
          }}
        />
      </div>

      <HorizonLine />

      <div style={{ display: "flex" }}>
        <h5>가격</h5>
        <p style={{ color: 'red' }}>*</p>
        <input
          type="text"
          placeholder="  ₩ 숫자만 입력해주세요."
          value={itemprice}
          onChange={savePrice}
          style={{
            background_color: "transparent",
            border: "2px solid rgba(0, 0, 0, 0.23)",
            borderRadius: "7px", marginLeft: "80px"
          }}
        />
        <p style={{ marginLeft: "15px" }}> 원</p>
      </div>
      <HorizonLine />

      <div style={{ display: "flex" }}>
        <h5> 설명 </h5>
        <p style={{ color: 'red' }}>*</p>
        <br />
        <textarea
          name="contents"
          cols="90"
          rows="5"
          value={itemcontent}
          placeholder="  여러 장의 상품 사진과 구입 연도, 브랜드, 사용감, 하자 유무 등 대여자에게 필요한 정보를 꼭 포함해주세요. (10자 이상)&#13;&#10;"
          onChange={saveContent}
          style={{
            background_color: "transparent",
            border: "2px solid rgba(0, 0, 0, 0.23)",
            borderRadius: "7px", marginLeft: "80px"
          }}

        ></textarea>
      </div>

      <HorizonLine />
      <div style={{ display: "flex" }}>
        <h5>수량</h5>
        <br />
        <input
          type="text"
          placeholder='  1'
          value={itemquantity}
          onChange={saveQuantity}
          style={{
            background_color: "transparent",
            border: "2px solid rgba(0, 0, 0, 0.23)",
            borderRadius: "7px", marginLeft: "80px"
          }}
        />
        <p style={{ marginLeft: "15px", }}> 개</p>
      </div>
    </>
  )

}
export default Upload_Item;
