import { useState, useEffect } from 'react';
import { NavLink, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';  // 무한 스크롤용 라이브러리
import axios from 'axios';
import ExImg from '../../assets/img/가디건1.jpg';

import '../../App.css';
import '../../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import Posts from './Posts';
import TempData from "../../TempData";
import { useDispatch, useSelector } from 'react-redux';
import { additem } from '../../store';
import Category from '../../components/Category';


function ItemMain(props) {
  
  let dispatch=useDispatch();
  let store = useSelector((state) => { return state });
  console.log(store.item);
  

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("search");
  console.log("search id =" + id);


  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const [search, setSearch] = useState("");
  const [ItemIndex, setItemIndex] = useState(6);

  const onChange = (e) => {
    setSearch(e.target.value)
  }

  let navigate = useNavigate();


  const indexOfLast = currentPage * postsPerPage; //해당페이지의 마지막 인덱스(첫번째페이지가정 인덱스6)
  const indexOfFirst = indexOfLast - postsPerPage; //해당페이지의 첫번째 인덱스(첫번째페이지가정 인덱스1)


  //여기서는 1~100 번까지 아이템이 존재하면 1~6번 이렇게 잘라서 currentPosts라는 곳에 담아줌.
  const currentPosts = () => {
    let currentPosts = 0;
    currentPosts = store.item.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  

  const [searchdata, setSearchData] = useState([]);
  const data = [];
  
  const [view, setView] = useState(false);
  return (
    <div className='page-container'>
      {/* 본문상단의검색바 */}

      <div className='Search-Bar'>
        <form>
          <input type="text" maxLength='20' className='search_input' name='search' placeholder="어떤 상품을 찾으시나요?" onChange={(e) => {
            setSearch(e.target.value);
          }} />
          {/* <input type="submit" value="검색" className='search_submit'/> */}
        </form>
      </div>

      <div className='Main-Cateogory'>
        <ul onClick={()=>{setView(!view)}}>
          카테고리{" "}
          {view ? '⌃' : '⌄'}
          {view && <Category/>}
        </ul>
      </div>

      <div className='Main-Content'>
        방금 등록된 상품
      </div>
      
  
      {/* 본문가운데상품진열
      <div className="Item-Wrap">
        <Posts TempData={currentPosts()} navigate={navigate} loading={loading} ItemIndex={ItemIndex} />

      </div> */}

      {/* 본문가운데상품진열 */}
      <div className="Item-Wrap">
        {posts && <Posts currentPosts={currentPosts()} loading={loading} ItemIndex={ItemIndex} search={search} />}

      </div>


      {/* 본문하단버튼 */}
      <div className="Item-Pagination">
        <Pagination
          // 총데이터를 postsPerPage만큼 등분해서 보여준다. 6개씩보여주자.
          postsPerPage={postsPerPage} //각각 페이지당 포스트개수
          totalPosts={store.item.length} //전체 데이터 개수 
          paginate={setCurrentPage} //CurrentPage변경하는함수.(첫번째페이지가정 6)
        ></Pagination>
      </div>



      <div className='upload_item' style={{ position: "fixed", right: '45px', bottom: '30px' }}>
        <button style={{ borderRadius: "30px", fontSize: '20px', width: "100px", height: "50px", border: "none" }}
          onClick={() => navigate('/itemmain/upload-item')}> + 글쓰기 </button>
      </div>


    </div>
  );
};

// 아이템 생성 함수 지금사용 x , posts.js에서 아이템생성해줌.
function ItemProduce(props) {
  return (
    props.TempData.slice(0, props.ItemIndex).map((a, i) => {
      return (
        <div className="Item" onClick={() => {
          props.navigate('/itemmain/Detail');
        }}>
          <div className='Item-Img'>
            <img src={ExImg} style={{ width: 200, height: 200 }} />
          </div>
          <div className='Item-Information-Wrap'>
            <div className='Item-Name-Price-Date-Wrap'>
              <div className='Item-Name'>{props.TempData[i].Id} {props.TempData[i].title}</div>
              <div className='Item-Price'>가격 : {props.TempData[i].price}</div>
              <div className='Item-Date'>{props.TempData[i].date}</div>
            </div>
            <div className='Item-State'>
              {props.TempData[i].state}
            </div>
          </div>
        </div>
      )
    })
  )
}

// function Card(props) {

//   let navigate = useNavigate();

//   const about = "이승재 \n 조회 수 회 ⋅ 1초 전"

//   return (
//     <div className="col-md-4" style={{ marginBottom: "30px" }}
//       onClick={() => navigate('/itemmain/detail')}>
//       <img src={'https://codingapple1.github.io/shop/shoes1.jpg'} width="60%" />
//       <div className='etc' style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
//         <div style={{ textAlign: 'left', marginLeft: "60px" }}>
//           <h5> 3번 신은 신발 </h5>
//           <p style={{ color: 'gray', fontSize: "15px" }}>{about}</p>
//         </div>
//         <div style={{ textAlign: 'right' }}>
//           <p style={{ color: 'green', fontSize: "12px" }}>대여 가능</p>
//         </div>


//       </div>

//     </div>
//   )
// }

export default ItemMain;
