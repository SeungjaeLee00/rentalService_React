import { useState, useRef, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { useInView } from 'react-intersection-observer';  // 무한 스크롤용 라이브러리
import '../../App.css';
import HorizonLine from '../HorizonLine';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../img/logo.png'

function Detail() {

  let navigate = useNavigate();
  const [comments, setComments] = useState([
    { id: 1, name: 'Minjoo Park', content: 'I like it!', }
  ]);

  const nextId = useRef(1);

  const onInsert = useCallback(
    (name, content) => {
      const comment = {
        id: nextId.current,
        name,
        content
      };
      console.log(name);
      console.log(content);
      setComments(comments => comments.concat(comment));
      nextId.current += 1; //nextId 1씩 더하기
    },
    [comments],
  );


  return (
    <div className='page-container'>
      <div className='Detail_Item_wrap'>
        <div className='Detail_Item_Img'>
          <img style={{width:350, height:300}} src={logo}/>
        </div>
        <div className='Item_About'>
          <div className='Detail_Item_Category'>패션</div>
          <div className="Detail_Item_Name_Price">
            <div style={{ marginTop: 20, fontSize: 30 }} className="Detail_Item_Name">상품명</div>
            <div style={{ marginTop: 20 }} className="Detail_Item_Price">가격</div>
          </div>
          <div style={{ marginTop: 20 }}>
            <span>날짜</span>
            <span>조회</span>
            <span>찜</span>
            <div style={{ marginTop: 20 }}>상품설명</div>
          </div>
          <div style={{ marginTop: 20 }}>
            <button>쪽지보내기</button>
          </div>
        </div>
      </div>
      

      <div className='upload_item' style={{ position: "fixed", right: '45px', bottom: '30px' }}>
        <button style={{ borderRadius: "30px", fontSize: '20px', width: "100px", height: "50px", border: "none" }}
          onClick={() => navigate('/itemmain/upload-item')}> + 글쓰기 </button>
      </div>
    </div>
  )
}

export default Detail;