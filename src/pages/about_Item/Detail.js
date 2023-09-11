import { useState, useRef, useCallback, useEffect } from 'react';
import { Await, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import Do_Report from '../Report/Do_Report';
import { useSelector } from 'react-redux';
import { useAuth } from '../../components/AuthContext'
import HorizonLine from '../../components/HorizonLine';
import Login from '../Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import { Navigation, Pagination, Mousewheel, Keyboard} from 'swiper/modules';


import '../../style/modal.css';
// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';
import SwiperCore, { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/core';
import axios from 'axios';
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
  //console.log(id);

  const state = useLocation();

  const [item, setItem] = useState();
  const [itemlike, setItemLike] = useState();


  useEffect(() => {
    axios.get('http://13.125.98.26:8080/posts/' + id)
      .then(response => {
        console.log("useEffect성공");
        console.log(response.data.result.data);
        setItem(response.data.result.data);
        setItemLike(response.data.result.data.likes);
      })
  }, [])


  const likeadd = () => {
    axios.post('http://13.125.98.26:8080/posts/' + id + '/likes')
  }



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
      <div className='Detail_Item_wrap'>
        <div className='Detail_Item_Img'>


          {/* <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            <SwiperSlide><img src={ExImg1} /></SwiperSlide>
            <SwiperSlide><img src={ExImg2} /></SwiperSlide>
            <SwiperSlide><img src={ExImg3} /></SwiperSlide>
            <SwiperSlide><img src={ExImg4} /></SwiperSlide>
          </Swiper> */}


          <Do_Report open={showReportPopup} close={closeReportnModal} ></Do_Report>
          <Login open={showLoginPopup} close={closeloginModal} ></Login>
          <div className='Detail_Item_wrap'>
            <div className='Detail_Item_Img'>
             {item ? <img style={{width:"300px", height:"300px"}} /> : null}
            </div>
            {item ? <div>
              <div className='Item_About'>


                {/* <div style={{marginTop:"15px"}}>작성자 : {item.writer.nickname}</div> */}
                <div className='Detail_Item_Category'>홈 &nbsp; {'>'}&nbsp; {item.categoryName}&nbsp; {'>'} &nbsp; {item.title}</div>
                <div className="Detail_Item_Name_Price">
                  <div style={{ marginTop: 20, fontSize: 30, fontWeight: "bold" }} className="Detail_Item_Name">{item.item ? item.item.name : "로딩중"}</div>
                  <div style={{ marginTop: 20, fontSize: 30, fontWeight: "bold" }} className="Detail_Item_Price">{item.item ? item.item.price : "로딩중"}</div>
                </div>
                <div style={{ marginTop: 20 }}>
                  <span>2023.08.13.16:00&nbsp;</span>
                  

            
                  <div style={{ marginTop: "20px" }}>{item.content}</div>
                  <div  style={{marginTop:"20px"}} >👤{item.writer.nickname}</div>
                  

                </div>
                <div className='Item_Button'>
                  <button onClick={() => {
                    axios.post('http://13.125.98.26:8080/posts/' + id + '/likes', null, {
                      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.accessToken}` },
                      headers: { Auth: localStorage.refreshToken },
                    })
                      .then(response => {
                        console.log("성공");
                        
                        let copy = item;
                        copy.likes = 1;
                        setItem(copy);
                        {itemlike ? setItemLike(false) : setItemLike(true)}
                        
                      })
                      .catch(error => {
                        console.log(error.response.data.result);
                      })
                  }}   style={{ backgroundColor: "white", color: "black" }}>{itemlike ? <span>♥</span> : <span>♡</span>}</button>
                  <button onClick={() => navigate('/itemmain/detail/chat')}>쪽지보내기</button>
                  <button onClick={openReportModal} variant="secondary" size="lg">❗️</button>
                  <Do_Report open={showReportPopup} close={closeReportnModal} ></Do_Report>

                </div>
              </div>
            </div> : <div>로딩중</div>}



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
      </div>
    </div>
  )
}

export default Detail;