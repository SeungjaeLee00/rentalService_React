import NavBar from '../NavBar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

import '../../App.css';
import HorizonLine from '../HorizonLine';

const Edit_Item = () => {
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    itemimage: '',
    title: '',
    price: '',
    contents: '',
    count: '',
  });

  const { itemimage, title, price, contents, count } = board; //비구조화 할당

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져오기
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const saveBoard = async () => {
    await axios.post(`//localhost:3000/board`, board).then((res) => {
      alert('등록되었습니다.');
      navigate('/itemmain');
    });
  };

  let [itemimg, setItemImg] = useState("");

  const setPreViewImg = (event) => {
    var reader = new FileReader();

    reader.onload = function(event) {
      setItemImg(event.target.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  return(
  <>
  <NavBar />
  <div style={{ marginTop: "80px", marginLeft: "110px", marginRight: "110px", marginBottom: "80px"}}>
    <div style={{ display: "flex" }}>
      <h3 >기본 정보</h3>
      <p style={{ color:'red' , fontSize: "14px"}}>{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}*필수항목</p>
    </div>
    <p style={{ border: "solid 1px #000000", marginTop: "10px"}}></p>
    <br />

    <div style={{ display: "flex" }}>
      <h5>상품이미지</h5>
      <p style={{ color:'red' }}>*</p>
      <img src={itemimg} style={{maxWidth: "500px", marginLeft: "40px"}}></img>
      <input 
        type="file" 
        id="image" 
        accept="img/*" 
        name='itemimage'
        value={itemimage} 
        onChange={setPreViewImg}/>
    </div>

    <br />
    <HorizonLine />
    <br />
    
    <div style={{ display: "flex" }}>
      <h5>제목</h5>
      <p style={{ color:'red' }}>*</p>
      <br />
      <input 
        type="text" 
        name="title" 
        placeholder="  상품 제목을 입력해주세요."
        value={title} 
        onChange={onChange}
        style={{ background_color: "transparent", 
                  border: "2px solid rgba(0, 0, 0, 0.23)",
                  borderRadius: "7px", marginLeft: "80px", width: "800px" }} />
    </div>

    <br />
    <HorizonLine />
    <br />

    <div style={{ display: "flex" }}>
      <h5>카테고리</h5>
      <p style={{ color:'red' }}>*</p>
      <FormControl sx={{ minWidth: 200, marginLeft: " 55px" }}>
          <NativeSelect
            defaultValue={"none"}
            inputProps={{
              name: "category",
              id: "uncontrolled-native",
            }}
          >
            <option value={"none"}>통합검색</option>
            <option value={"home-appliances"}>가전제품</option>
            <option value={"household-goods"}>생활용품</option>
            <option value={"musical-instruments"}>악기</option>
            <option value={"toy"}>완구</option>
            <option value={"cloth"}>의류</option>
            <option value={"etc"}>기타</option>
          </NativeSelect>
        </FormControl>
    </div>

    <br />
    <HorizonLine />
    <br />

    <div style={{ display: "flex" }}>
      <h5>가격</h5>
      <p style={{ color:'red' }}>*</p>
      <br />
      <input
        type="text"
        name="price"
        placeholder="  ₩ 숫자만 입력해주세요."
        value={price}
        onChange={onChange}
        style={{ background_color: "transparent", 
                 border: "2px solid rgba(0, 0, 0, 0.23)",
                 borderRadius: "7px", marginLeft: "80px" }}
      />
      <p style={{ marginLeft: "15px" }}> 원</p>  
    </div>

    <br />
    <HorizonLine />
    <br />
    
    <div style={{ display: "flex" }}>
      <h5> 설명 </h5>
      <p style={{ color:'red' }}>*</p>
      <br />
      <textarea
        name="contents"
        cols="90"
        rows="5"
        value={contents}
        placeholder="  여러 장의 상품 사진과 구입 연도, 브랜드, 사용감, 하자 유무 등 대여자에게 필요한 정보를 꼭 포함해주세요. (10자 이상)&#13;&#10;"
        onChange={onChange}
        style={{ background_color: "transparent", 
                 border: "2px solid rgba(0, 0, 0, 0.23)",
                 borderRadius: "7px", marginLeft: "80px" }}
                 
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
        onChange={onChange}
        style={{ background_color: "transparent", 
                 border: "2px solid rgba(0, 0, 0, 0.23)",
                 borderRadius: "7px", marginLeft: "80px" }}
      />
      <p style={{ marginLeft: "15px", }}> 개</p>  
    </div>
    
    <button className='buttonstyle' style={{ fontSize:'20px',  width:"100px", height: "50px" }}
            onClick={ saveBoard }> 등록하기 </button>
    </div>
    </>
  );
};

export default Edit_Item;