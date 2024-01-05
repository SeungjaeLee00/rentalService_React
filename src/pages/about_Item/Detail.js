import { useState, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Do_Report from '../Report/Do_Report';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/modal.css';
import axios from 'axios';
import SetKST from '../../utils/SetKST';
import WriteBtn from '../../components/WriteBtn';
import Comment from './Comment';
import '../../style/ItemDetail.css'

function Detail() {
  const navigate = useNavigate();

  //id는 검색 '/' 뒤에 붙는 값
  let { id } = useParams();


  //navigate와 함께보내주는 데이터 location ->  단일상품에 시간 key가없어서 location으로 시간표시
  const location = useLocation();

  //item -> 단일상품정보 
  const [item, setItem] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();


  const [showReportPopup, setshowReportPopup] = useState(false);

  const fetchPostInfo = async () => {
    try {
      setItem(null);
      setError(null);
      setLoading(true);
      const response = await axios.get('/api/posts/' + id);
      setItem(response.data);
    }
    catch (e) {
      console.log(e);
      if (e.response.data.code == '511') {
        alert('로그인이 만료되어 로그인 페이지로 이동합니다');
        window.location.replace('/loginpage');
      }
      setError(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    //상품한개정보
    fetchPostInfo();
    //최근본상품
    let output = localStorage.getItem('watched');
    //0이면 parse 할수없음. 값이 없기때문
    if (output.length > 0) {
      output = JSON.parse(output);
    }
    output.unshift(id);
    //값이 2번씩들어가서 set사용.
    output = new Set(output);
    output = Array.from(output);
    localStorage.setItem('watched', JSON.stringify(output));
  }, [])




  const openReportModal = () => {
    // const postId = item.id; 
    setshowReportPopup(true);
    // setPostId(postId);
  };
  const closeReportnModal = () => {
    setshowReportPopup(false);
  };

  const onProfileClick = () => {
    navigate('/itemmain/detail/profile', { state: item.writer.nickname })
  };

  if (loading) <div>로딩중입니다..</div>
  if (error) <div>에러가발생했습니다..</div>
  if (!item) return null;
  console.log(item);
  return (
    <>
      <div className='Detail-container'>
        <div className='Detail_Item_wrap'>
          <div className='Detail_Item_Img'>
            <Do_Report open={showReportPopup} close={closeReportnModal} ></Do_Report>

            {/* 상품정보컴포넌트 */}
            <OneItem item={item} id={id} fetchPostInfo={fetchPostInfo} location={location} setItem={setItem} 
              navigate={navigate} openReportModal={openReportModal} showReportPopup={showReportPopup} closeReportnModal={closeReportnModal}
              onProfileClick={onProfileClick} />
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
    axios.post('/api/posts/' + props.id + '/likes', null, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.accessToken}` },
      headers: { Auth: localStorage.refreshToken },
    })
      .then(response => {
        props.fetchPostInfo();
      })
      .catch(error => {
        if(error.response.data.code==511)
        {
          alert('로그인이 필요한 요청입니다.');
        }
        else alert('다시 시도해 주세요');
        console.log(error.response);
      })
  }

  return (
    <div>
    <div className='Detail_Item_wrap'>
      {/* img */}
      <div>
        <img className='oneImg' src={'https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post/' + props.item.imageName}
           />
      </div>
      
      {/* 상품정보,설명 등 */}
      <div className='Item_About'>
        <div className='Detail_Item_Category'>
          <span><Link to='/'>홈</Link></span> &nbsp; {'>'}&nbsp;
          <span> {props.item.categoryName}</span>&nbsp; {'>'} &nbsp;
          <span>{props.item.title}</span>
        </div>
        <div className="Detail_Item_Name_Price">
          <div  className="Detail_Item_Name"> {props.item.item.name}</div>
          <div  className="Detail_Item_Price">
            {props.item.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
        </div>
        <div style={{ marginTop: "15px" }}>
          <span className='Item_Time'>{SetKST(props.location.state)}</span>
         
          <div className='nickname-btn'>
            <div className='profile' onClick={props.onProfileClick}  >👤{props.item.writer.nickname}</div>
            <button onClick={props.openReportModal} variant="secondary">❗️</button>
          </div>
        </div>
        <div className='Item_Button'>
          <button className='likebtn' onClick={LikeAdd}><span style={{ color: "red" }}>♥</span>&nbsp;<span>{props.item.likes}</span></button>
          <button className='sendbtn' onClick={() => props.navigate('/itemmain/detail/chat', { state: props.item })}>쪽지보내기</button>
          <Do_Report open={props.showReportPopup} close={props.closeReportnModal} postId={props.id} />
        </div>

      </div>
    </div>
    <div className='Content-Wrap'>
        <label>상품 내용</label>
        <p className='Item_Content'>{props.item.content}</p>
    </div>
   
    </div>
  )
}
export default Detail;