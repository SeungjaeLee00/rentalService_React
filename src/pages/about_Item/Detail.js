import { useState, useRef, useCallback, useEffect } from 'react';
import { Await, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../App.css';
import Do_Report from '../Report/Do_Report';
import { useSelector } from 'react-redux';
import HorizonLine from '../../components/HorizonLine';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExImg1 from '../../assets/img/Gadigun1.jpg'
import ExImg2 from '../../assets/img/가디건2.png'
import ExImg3 from '../../assets/img/가디건3.jpg'
import ExImg4 from '../../assets/img/가디건4.jpg'

// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import { Navigation, Pagination, Mousewheel, Keyboard} from 'swiper/modules';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'; 
import 'swiper/components/navigation/navigation.min.css'; 
import 'swiper/components/pagination/pagination.min.css'; 
import 'swiper/components/scrollbar/scrollbar.min.css'; 
import SwiperCore, { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/core';
import axios from 'axios';
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);



function Detail() {
  
  let {id} = useParams();
  console.log(id);
  const state = useLocation();

  const [temp,setTemp] = useState();
   
  // let temp2;
  // axios.get('http://13.125.98.26:8080/posts/'+id)
  // .then(response=>{
  //   console.log(response);
  //   temp2=response;
  // })
  // console.log(item);

  useEffect(()=>{
    axios.get('http://13.125.98.26:8080/posts/'+id)
    .then(response=>{
      console.log("성공");
      console.log(response.data.result.data);
      setTemp(response.data.result.data);
    })
  },[])
  
  
  
  let navigate = useNavigate();
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
  const [showReportPopup, setshowReportPopup] = useState(false);

  const openReportModal = () => {
    setshowReportPopup(true);
  };
  const closeReportnModal = () => {
    setshowReportPopup(false);
  };

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

        </div>
        <div className='Item_About'>
        
        {temp ? <div>
          {/* <div style={{marginTop:"15px"}}>작성자 : {temp.writer.nickname}</div> */}
          <div className='Detail_Item_Category'>홈 &nbsp; {'>'}&nbsp; {temp.categoryName}&nbsp; {'>'} &nbsp; {temp.title}</div>
          <div className="Detail_Item_Name_Price">
            <div style={{ marginTop: 20, fontSize: 30, fontWeight: "bold" }} className="Detail_Item_Name">{temp.item? temp.item.name : "로딩중"}</div>
            <div style={{ marginTop: 20, fontSize: 30, fontWeight: "bold" }} className="Detail_Item_Price">{temp.item? temp.item.price: "로딩중"}</div>
          </div>
          <div style={{ marginTop: 20 }}>
            <span>2023.08.13.16:00&nbsp;{'·'}&nbsp;</span>
            <span>조회 4&nbsp;{'·'}&nbsp;&nbsp;</span>
            <span>찜 0</span>
            <div style={{ marginTop: 20 }}>{temp.content}</div>
            
          </div>
        </div> : <div>로딩중</div>}
          

          
          <div className='Item_Button'>
            <button style={{ backgroundColor: "white", color: "black" }}>찜</button>
            <button onClick={() => navigate('/itemmain/detail/chat')}>쪽지보내기</button>
            <button onClick={openReportModal} variant="secondary" size="lg">❗️</button>
            <Do_Report open={showReportPopup} close={closeReportnModal} ></Do_Report>

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
          onClick={() => navigate('/itemmain/upload-item')}> + 글쓰기 </button>
      </div>
      
    </div>
  )
}

export default Detail;