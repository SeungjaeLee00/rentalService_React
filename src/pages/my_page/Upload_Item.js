import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import HorizonLine from '../../components/HorizonLine';
import { useAuth } from '../../components/AuthContext';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import '../../style/Upload.css';


const Upload_Item = () => {

  const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;
  const { isAuthenticated } = useAuth();
  const [file, setFile] = useState();
  const [itemtitle, setItemTitle] = useState('');
  const [itemcontent, setItemContent] = useState('');
  const [itemcategoryName, setItemCategoryName] = useState('가전제품');
  const [itemname, setItemName] = useState('');
  const [itemprice, setItemPrice] = useState();
  


  //state에는 마이페이지에서 게시글 수정버튼 눌렀을때 게시물의 id가 담깁니다.
  const { state } = useLocation();

  // console.log(state);
  // console.log(typeof (state));

  const [error, setError] = useState(null);
  
  const [category, setCategory]= useState('');
  const fetchCategory = async() =>{
    try{
      const response = await axios.get('/api/category')
      setCategory(response.data[1].children);
      console.log(response.data[1].children);           
    }catch(e){
      console.log(e);
    }
  }

  const updatePost = async () => {
    try {
      setError(null);
      const response = await axios.get('/api/posts/' + state);
      console.log(response.data);
      let copy = response.data;
      setItemTitle(copy.title);
      setItemContent(copy.content);
      setItemCategoryName(copy.categoryName);
      setItemName(copy.item.name);
      setItemPrice(copy.item.price);
    } catch (e) {
      setError(e);
    }
  }
  useEffect(() => {
    //state가 null이 아니면 마이페이지에서 게시글 수정버튼을 누른것
    if (state != null) {
      updatePost();
    }
    fetchCategory();
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
    //세부카테고리선택하면 세부카테고리만 짤라서 setState해준다.
    let str = e.target.value.split(' ');
    console.log(str);
    if(str.length==2) str = str[1];
    else str=str[0];
    console.log(str);
    setItemCategoryName(str);
  }
  const saveName = (e) => {
    setItemName(e.target.value);
  }
  const savePrice = (e) => {
    setItemPrice(e.target.value);
  }

  function produce() {
    //게시글생성
    if (state == null) {
      //사용자의 데이터를 서버에 전달하기 위해 Form형식으로 데이터를 생성
      const formData = new FormData();
      formData.append('title', itemtitle);
      formData.append('content', itemcontent);
      formData.append('categoryName', itemcategoryName);
      formData.append('itemCreateRequest.name', itemname);
      formData.append('itemCreateRequest.price', itemprice);
      formData.append('itemCreateRequest.quantity', 1);
      formData.append('multipartFiles', file);
      console.log(itemcategoryName);
      axios.post("/api/posts", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${actoken}`,
          'Auth' : retoken
       }
      })
        .then(response => {
          console.log("게시물생성성공");
          window.location.replace("/");
        })
        .catch(error => {
          if (error.response.data.code == '511') {
            alert('로그인이 만료되어 로그인 페이지로 이동합니다');
            window.location.replace('/loginpage');
          }
          console.log(error);
        })
    }
    else //게시글 수정 
    {
      const formData = new FormData();
      formData.append('title', itemtitle);
      formData.append('content', itemcontent);
      formData.append('categoryName', itemcategoryName);
      formData.append('ItemUpdateRequest.name', itemname);
      formData.append('ItemUpdateRequest.price', itemprice);
      formData.append('ItemUpdateRequest.quantity', 1);
      formData.append('multipartFiles', file);
      console.log(formData);
      axios.patch("/api/posts/" + state, formData, {
        headers : {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${actoken}`,
          'Auth' : retoken
        }
      })
        .then(response => {
          console.log("수정성공");
          window.location.replace("/");
        })
        .catch(error => {
          if (error.response.data.code == '511') {
            alert('로그인이 만료되어 로그인 페이지로 이동합니다');
            window.location.replace('/loginpage');
          }
          console.log(error);
        })
    }
  }

  if (!isAuthenticated) {
    window.location.replace("/loginpage")
  }

  if(!category) return null;

  return (
    <div className='upload-wrap'>
        <div style={{ marginTop: "10px", marginLeft: "110px", marginRight: "110px", marginBottom: "80px" }}>
          <div style={{ display: "flex" }}>
            <h3 >상품 정보</h3>
            <p style={{ color: 'red', fontSize: "14px" }}>{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}*필수항목</p>
          </div>
          <p style={{ border: "solid 1px #000000", marginTop: "10px" }}></p>
          <br />
          <Input itemtitle={itemtitle} itemcontent={itemcontent} itemcategoryName={itemcategoryName} itemname={itemname} itemprice={itemprice}
            saveFile={saveFile} saveTitle={saveTitle} saveCategory={saveCategory} saveName={saveName} savePrice={savePrice}
            saveContent={saveContent}  category={category}/>

          <Button 
            onClick={produce}>등록하기</Button>
        </div>
    </div>
  );
};

function Input({ itemtitle, itemcontent, itemcategoryName, itemname, itemprice,  
  saveFile, saveTitle, saveCategory, saveName, savePrice, saveContent,category }) {
  
  return (
    <>
      <div className='img-wrap'>
        <h5>상품이미지</h5>
        <p style={{ color: 'red' }}>*</p>
        <input type='file' onChange={saveFile} />
      </div>
      <HorizonLine />
      <div className='title-wrap'>
        <h5>제목</h5>
        <p style={{ color: 'red' }}>*</p>
        <input          
          placeholder="게시글의 제목을 입력해주세요."
          value={itemtitle}
          onChange={saveTitle}
           />
      </div>
      <HorizonLine />
      <div className='category-wrap'>
        <h5>카테고리</h5>
        <p style={{ color: 'red' }}>*</p>
        <FormControl sx={{ minWidth: 300, marginLeft: " 55px" }}>
          <NativeSelect
            onChange={saveCategory}
            //value={itemcategoryName}
            inputProps={{
              name: "category",
              id: "uncontrolled-native",
            }}
              >
                {category.map(a=>(
                  <>
                  <option style={{fontWeight:"bold"}}  >{a.name}</option>
                  {a.children.map(item=>(
                    <option>{a.name} {item.name}</option>
                  ))}
                  </>
                  ))
                  }
            {/* <option onClick={() => { saveCategory("가전제품") }} >가전제품</option>
            <option onClick={() => { saveCategory("생활용품") }} >생활용품</option>
            <option onClick={() => { saveCategory("악기") }} >악기</option>
            <option onClick={() => { saveCategory("완구") }} >완구</option>
            <option onClick={() => { saveCategory("의류") }} >의류</option>
            <option onClick={() => { saveCategory("기타") }} >기타</option> */}
          </NativeSelect>
        </FormControl>
      </div>
      <HorizonLine />

      <div className='name-wrap'>
        <h5>상품이름</h5>
        <p style={{ color: 'red' }}>*</p>
        <br />
        <input          
          placeholder="상품의 이름을 입력해주세요"
          value={itemname}
          onChange={saveName}
        />
      </div>

      <HorizonLine />

      <div className='price-wrap'>
        <h5>가격</h5>
        <p style={{ color: 'red' }}>*</p>
        <input          
          placeholder="숫자만 입력해주세요"
          value={itemprice}
          onChange={savePrice}
        />
      </div>
      
      <HorizonLine />

      <div className='content-wrap'>
        <h5> 설명 </h5>
        <p style={{ color: 'red' }}>*</p>
        <br />
        <textarea
          name="contents"
          cols="90"
          rows="5"
          value={itemcontent}
          placeholder="상품 사진과 구입 연도, 브랜드, 사용감, 하자 유무 등 대여자에게 필요한 정보를 꼭 포함해주세요"
          onChange={saveContent}
        ></textarea>
      </div>
    </>
  )

}
export default Upload_Item;

let Button = styled.button`
  margin-left:830px;
  margin-top:25px;
  width:130px;
  height:40px;
  border-radius: 5px;
    background-color: black;
    color:white;
    transition: all 0.3s;
    &:hover{
        background-color: rgb(66, 66, 253);
    }
`;
