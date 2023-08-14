import { useState, useEffect } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';  // 무한 스크롤용 라이브러리
import axios from 'axios';
import ExImg from '../../assets/img/상품예시.jpg';

import '../../App.css';
import '../../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import Posts from './Posts';

function ItemMain() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value)
  }

  // let [item, setItem] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        // "http://13.125.98.26:8080/auth/sign-up"
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  return (
    <div className='page-container'>

      {/* 본문상단의검색바 */}
      <SearchBar />

      {/* 본문가운데상품진열 */}
      <div className="Item-Wrap">
        <div className='Item-TopSide'>
          <ItemProduce navigate={navigate}/>
          <ItemProduce navigate={navigate}/>
          <ItemProduce navigate={navigate}/>
        </div>
        <div className='Item-BottomSide'>
          <ItemProduce navigate={navigate}/>
          <ItemProduce navigate={navigate}/>
          <ItemProduce navigate={navigate}/>
        </div>

      </div>



      {/* 본문하단버튼 */}
      {/* <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={setCurrentPage}
      ></Pagination> */}


      <div className='upload_item' style={{ position: "fixed", right: '45px', bottom: '30px' }}>
        <button style={{ borderRadius: "30px", fontSize: '20px', width: "100px", height: "50px", border: "none" }}
          onClick={() => navigate('/itemmain/upload-item')}> + 글쓰기 </button>
      </div>


    </div>
  );
};


function ItemProduce(props) {
  return (
    <div className="Item" onClick={()=>{
      props.navigate('/itemmain/Detail');
    }}>
      <div className='Item-Img'>
        <img src={ExImg} style={{ width: 200, height: 200 }} />
      </div>
      <div className='Item-Information-Wrap'>
        <div className='Item-Name-Price-Date-Wrap'>
          <div className='Item-Name'>(새상품)꼼데라송 가디건</div>
          <div className='Item-Price'>가격 : 250,000원</div>
          <div className='Item-Date'>2023.08.13.16:00</div>
        </div>
        <div className='Item-State'>
          상품상태 : 판매중
        </div>
      </div>
    </div>
  )

}

function Card(props) {

  let navigate = useNavigate();

  const about = "이승재 \n 조회 수 회 ⋅ 1초 전"

  return (
    <div className="col-md-4" style={{ marginBottom: "30px" }}
      onClick={() => navigate('/itemmain/detail')}>
      <img src={'https://codingapple1.github.io/shop/shoes1.jpg'} width="60%" />
      <div className='etc' style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
        <div style={{ textAlign: 'left', marginLeft: "60px" }}>
          <h5> 3번 신은 신발 </h5>
          <p style={{ color: 'gray', fontSize: "15px" }}>{about}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: 'green', fontSize: "12px" }}>대여 가능</p>
        </div>


      </div>

    </div>
  )
}

export default ItemMain;

  // style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}