import { useState, useRef, useCallback } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import '../../App.css';
import Do_Report from '../Report/Do_Report';
import { useSelector } from 'react-redux';
import { useAuth } from '../../components/AuthContext'
import HorizonLine from '../../components/HorizonLine';
import Login from '../Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/modal.css';
// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';
import SwiperCore, { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);


function Detail() {
  let navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [showLoginPopup, setshowLoginPopup] = useState(false);
  const [showReportPopup, setshowReportPopup] = useState(false);

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

  const onChatHandler = () => {
    if (!isAuthenticated) {
      openloginModal();
    }
    else {
      navigate('/itemmain/detail/chat')
    }
  }

  const onReportHandler = () => {
    if (!isAuthenticated) {
      openloginModal();
    }
    else {
      openReportModal();
    }
  }

  const onUploaditemHandler = () => {
    if (!isAuthenticated) {
      openloginModal();
    }
    else {
      navigate('/itemmain/upload-item')
    }
  }

  let { id } = useParams();
  console.log(id);
  let a = useSelector((state) => { return state });
  console.log(a.item[id].title);


  const [comments, setComments] = useState([
    { id: 1, content: 'I like it!' }
  ]);

  const nextId = useRef(1);

  const onInsert = useCallback(
    (content) => {
      const comment = {
        id: nextId.current,
        content
      };
      console.log(content);
      setComments(comments => comments.concat(comment));
      nextId.current += 1;
    },
    [comments],
  );

  const [value, setValue] = useState({
    content: ''
  });

  const onChangeContent = useCallback(
    (e) => {
      setValue({
        content: e.target.value,
      });
    },
    [value]
  );

  const onSubmit = useCallback(
    e => {
      onInsert(value.content);
      setValue({
        content: ''
      });
      e.preventDefault();
    },
    [onInsert, value],
  );

  return (
    <div className='page-container'>
      <Do_Report open={showReportPopup} close={closeReportnModal} ></Do_Report>
      <Login open={showLoginPopup} close={closeloginModal} ></Login>
      <div className='Detail_Item_wrap'>
        <div className='Detail_Item_Img'>
        </div>
        <div className='Item_About'>
          <div className='Detail_Item_Category'>홈 &nbsp; {'>'}&nbsp; {a.item[id].category}&nbsp; {'>'} &nbsp; {a.item[id].title}</div>
          <div className="Detail_Item_Name_Price">
            <div style={{ marginTop: 20, fontSize: 30, fontWeight: "bold" }} className="Detail_Item_Name">{a.item[id].title}</div>
            <div style={{ marginTop: 20, fontSize: 30, fontWeight: "bold" }} className="Detail_Item_Price">{a.item[id].price}</div>
          </div>
          <div style={{ marginTop: 20 }}>
            <span>2023.08.13.16:00&nbsp;{'·'}&nbsp;</span>
            <span>조회 4&nbsp;{'·'}&nbsp;&nbsp;</span>
            <span>찜 0</span>
            <button onClick={onReportHandler} style={{ border: "none", marginLeft: "20px" }}>신고하기</button>
            <div style={{ marginTop: 20 }}>{a.item[id].content}</div>
          </div>

          <div className='Item_Button'>
            <button style={{ backgroundColor: "white", color: "black" }}>찜</button>
            <button onClick={onChatHandler}>쪽지보내기</button>
          </div>
        </div>

      </div>
      <HorizonLine />

      <div style={{ padding: "20px" }}>
        <h3>댓글</h3>
        <form className="CommentInsert" onSubmit={onSubmit}
          style={{ display: 'flex' }}>
          <textarea placeholder="    댓글을 입력하세요."
            cols="90"
            rows="2"
            style={{
              background_color: "transparent",
              border: "2px solid rgba(0, 0, 0, 0.23)",
              borderRadius: "7px", marginLeft: "270px"
            }}
            value={value.content}
            onChange={onChangeContent}
          />
          <button type="submit" style={{ border: 'none', marginLeft: "5px" }}>보내기</button>
        </form>
      </div>

      <div className='upload_item' style={{ position: "fixed", right: '45px', bottom: '30px' }}>
        <button style={{ borderRadius: "30px", fontSize: '20px', width: "100px", height: "50px", border: "none" }}
          onClick={onUploaditemHandler}> + 글쓰기 </button>
      </div>

    </div>
  )
}

export default Detail;