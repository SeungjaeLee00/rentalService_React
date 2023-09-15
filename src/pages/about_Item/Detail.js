import { useState, useRef, useCallback, useEffect } from 'react';
import { Await, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import Do_Report from '../Report/Do_Report';
import { useAuth } from '../../components/AuthContext'
import Login from '../Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/modal.css';
import axios from 'axios';

function Detail() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  let { id } = useParams();
  //location -> post에서 호출한 상품 1개의 데이터
  const location = useLocation();
  //item -> 단일상품정보 
  const [item, setItem] = useState();
  //itemlike -> 단일상품 좋아요 표시
  const [itemlike, setItemLike] = useState();

  const [showLoginPopup, setshowLoginPopup] = useState(false);
  const [showReportPopup, setshowReportPopup] = useState(false);

  useEffect(() => {
    axios.get('http://13.125.98.26:8080/posts/' + id)
      .then(response => {
        console.log(response.data.result.data);
        setItem(response.data.result.data);
        setItemLike(response.data.result.data.likes);
      })
  }, [])

  const openloginModal = () => {
    setshowLoginPopup(true);
  };
  const closeloginModal = () => {
    setshowLoginPopup(false);
  };

  const openReportModal = () => {
    setshowReportPopup(true);
  };
  const closeReportnModal = () => {
    setshowReportPopup(false);
  };

  const onUploaditemHandler = () => {
    if (!isAuthenticated) {
      openloginModal();
    }
    else {
      navigate('/itemmain/upload-item')
    }
  }

  return (
    <div className='page-container'>
      <div className='Detail_Item_wrap'>
        <div className='Detail_Item_Img'>
          <Do_Report open={showReportPopup} close={closeReportnModal} ></Do_Report>
          <Login open={showLoginPopup} close={closeloginModal} ></Login>

          <OneItem item={item} id={id} location={location} setItem={setItem} itemlike={itemlike} setItemLike={setItemLike}
            navigate={navigate} openReportModal={openReportModal} showReportPopup={showReportPopup} closeReportnModal={closeReportnModal} />

          <div className='upload_item' style={{ position: "fixed", right: '45px', bottom: '30px' }}>
            <button style={{ borderRadius: "30px", fontSize: '20px', width: "100px", height: "50px", border: "none" }}
              onClick={onUploaditemHandler}> + 글쓰기 </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function OneItem(props) {
  function LikeAdd() {
    axios.post('http://13.125.98.26:8080/posts/' + props.id + '/likes', null, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.accessToken}` },
      headers: { Auth: localStorage.refreshToken },
    })
      .then(response => {
        console.log("성공");
        let copy = props.item;
        copy.likes = 1;
        props.setItem(copy);
        { props.itemlike ? props.setItemLike(false) : props.setItemLike(true) }

      })
      .catch(error => {
        console.log(error.response.data.result);
      })
  }
  //UTC -> 한국시간으로 바꿔주는 함수.
  function time(itemtime) {
    const kor = new Date(itemtime);
    kor.setHours(kor.getHours()+9);
    return kor.toLocaleString();
   }

  return (
    <div className='Detail_Item_wrap'>
      <div className='Detail_Item_Img'>
        {props.item ? <img src={'https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post/' + props.item.imageName}
          style={{ width: "300px", height: "300px" }} /> : null}
      </div>
      {props.item ? <div>
        <div className='Item_About'>
          {/* <div style={{marginTop:"15px"}}>작성자 : {item.writer.nickname}</div> */}
          <div className='Detail_Item_Category'>홈 &nbsp; {'>'}&nbsp; {props.item.categoryName}&nbsp; {'>'} &nbsp; {props.item.title}</div>
          <div className="Detail_Item_Name_Price">
            <div style={{ marginTop: 20, fontSize: 30, fontWeight: "bold" }} className="Detail_Item_Name">{props.item.item ? props.item.item.name : "로딩중"}</div>
            <div style={{ marginTop: 20, fontSize: 30, fontWeight: "bold" }} className="Detail_Item_Price">{props.item.item ? props.item.item.price : "로딩중"}</div>
          </div>
          <div style={{ marginTop: 20 }}>
            <span>{time(props.location.state.createdTime)}&nbsp;</span>
            <div style={{ marginTop: "20px" }}>{props.item.content}</div>
            <div style={{ marginTop: "20px" }} >👤{props.item.writer.nickname}</div>
          </div>
          <div className='Item_Button'>
            <button onClick={LikeAdd} style={{ backgroundColor: "white", color: "black" }}>{props.itemlike ? <span>♥</span> : <span>♡</span>}</button>
            <button onClick={() => props.navigate('/itemmain/detail/chat', { state: props.item })}>쪽지보내기</button>
            <button onClick={props.openReportModal} variant="secondary" size="lg">❗️</button>
            <Do_Report open={props.showReportPopup} close={props.closeReportnModal} ></Do_Report>

          </div>
        </div>
      </div> : <div>로딩중</div>}
    </div>

  )
}
export default Detail;