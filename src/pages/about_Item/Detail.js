import { useState, useRef, useCallback, useEffect } from 'react';
import { Await, NavLink, useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import Do_Report from '../Report/Do_Report';
import { useAuth } from '../../components/AuthContext'
import Login from '../Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/modal.css';
import axios from 'axios';
import SetKST from '../../utils/SetKST';
import WriteBtn from '../../components/WriteBtn';
import Comment from './Comment';
import '../../style/ItemDetail.css'

function Detail() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  //id는 검색 '/' 뒤에 붙는 값
  let { id } = useParams();


  //navigate와 함께보내주는 데이터 location ->  단일상품에 시간 key가없어서 location으로 시간표시
  const location = useLocation();

  //item -> 단일상품정보 
  const [item, setItem] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  //itemlike -> 단일상품 좋아요 표시
  const [itemlike, setItemLike] = useState();

  const [showLoginPopup, setshowLoginPopup] = useState(false);
  const [showReportPopup, setshowReportPopup] = useState(false);

  const fetchPostInfo = async () => {
    try {
      setItem(null);
      setError(null);
      setLoading(true);
      const response = await axios.get('/posts/' + id);
      console.log(response.data.result.data);
      setItem(response.data.result.data);
      setItemLike(response.data.result.data.likes);
    }
    catch (e) {
      console.log(e);
      setError(e);
    }
  }

  useEffect(() => {
    //상품한개정보
    fetchPostInfo();
  }, [])

  const openloginModal = () => {
    setshowLoginPopup(true);
  };
  const closeloginModal = () => {
    setshowLoginPopup(false);
  };

  const openReportModal = () => {
    // const postId = item.id; 
    setshowReportPopup(true);
    // setPostId(postId);
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

  const onProfileClick = () => {
    navigate('/itemmain/detail/profile', { state: item.writer.nickname })
  };

  if (loading) <div>로딩중입니다..</div>
  if (error) <div>에러가발생했습니다..</div>
  if (!item) return null;

  return (
    <>
      <div className='Detail-container'>
        <div className='Detail_Item_wrap'>
          <div className='Detail_Item_Img'>
            <Do_Report open={showReportPopup} close={closeReportnModal} ></Do_Report>
            <Login open={showLoginPopup} close={closeloginModal} ></Login>
            {/* 상품정보컴포넌트 */}
            <OneItem item={item} id={id} location={location} setItem={setItem} itemlike={itemlike} setItemLike={setItemLike}
              navigate={navigate} openReportModal={openReportModal} showReportPopup={showReportPopup} closeReportnModal={closeReportnModal}
              onProfileClick={onProfileClick} />
              {/* 글쓰기 컴포넌트 */}
            <WriteBtn />
          </div>
        </div>
      </div>
      {/* 페이지 하단 댓글 컴포넌트 */}
      <Comment postid={id} nickname={item.writer.nickname} />
    </>
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

  return (
    <div className='Detail_Item_wrap'>
      {/* img */}
      <div className='Detail_Item_Img'>
        <img src={'https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post/' + props.item.imageName}
          style={{ width: "400px", height: "400px" }} />
      </div>

      {/* 상품정보,설명 등 */}
      <div className='Item_About'>
        <div className='Detail_Item_Category'>홈 &nbsp; {'>'}&nbsp; {props.item.categoryName}&nbsp; {'>'} &nbsp; {props.item.title}</div>
        <div className="Detail_Item_Name_Price">
          <div style={{ marginTop: 20, fontSize: 30, fontWeight: "bold" }} className="Detail_Item_Name"> {props.item.item.name}</div>
          <div style={{ marginTop: 20, fontSize: 30, fontWeight: "bold" }} className="Detail_Item_Price">{props.item.item.price}</div>
        </div>
        <div style={{ marginTop: 20 }}>
          <span>{SetKST(props.location.state)}&nbsp;</span>
          <div style={{ marginTop: "20px" }}>{props.item.content}</div>
          <div className='nickname-btn'>
            <div onClick={props.onProfileClick} style={{ marginTop: "20px" }} >👤{props.item.writer.nickname}</div>
            <button onClick={props.openReportModal} variant="secondary" size="lg">❗️</button>
            <Do_Report open={props.showReportPopup} close={props.closeReportnModal} postId={props.id} />
          </div>
        </div>
        <div className='Item_Button'>
          <button className='likebtn' onClick={LikeAdd} style={{ backgroundColor: "white", color: "black" }}>{props.itemlike ? <span>♥</span> : <span>♡</span>}</button>
          <button className='sendbtn' onClick={() => props.navigate('/itemmain/detail/chat', { state: props.item })}>쪽지보내기</button>
          <Do_Report open={props.showReportPopup} close={props.closeReportnModal} ></Do_Report>
        </div>

      </div>
    </div>
  )
}
export default Detail;