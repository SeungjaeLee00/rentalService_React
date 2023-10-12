import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from './Pagination';
import Posts from './Posts';
import WriteBtn from '../../components/WriteBtn';
import Watched from './Watched';

function ItemMain() {
  const navigate = useNavigate();
  const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;

  const [store, setStore] = useState(null);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  

  const fetchPosts = async () => {
    try {
      //요청시작할때 error와 store 초기화
      setError(null);
      setStore(null);
      //loading 상태를 true
      setLoading(true);
      const response = await axios.get('/api/posts');
      //게시물이 모두 삭제되었을때 로컬도 초기화 해줘야함. 
      if(response.data.postList.length==0)
      {
        localStorage.setItem('watched',JSON.stringify([]));
      }
      //console.log(response.data.postList);
      setStore(response.data.postList);
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);
  }

  const fetchMyInfo = async () => {
    try {
      const response = await axios.get('/api/members/my-profile', {
        headers: {
          'Authorization': `Bearer ${actoken}`,
          'Auth': retoken
        }
      })
      //console.log(response.data);
      //sessionstorage에 저장
      window.sessionStorage.setItem("nickname", response.data.nickname);
    } catch (e) {
      if (e.response.data.code == '511') {
        console.log(e);
        alert('로그인이 만료되어 로그인 페이지로 이동합니다');
        window.location.replace('/loginpage');
      }
      console.log(e);
    }
  }


  useEffect(() => {
    fetchPosts();
    fetchMyInfo();
    //최근본상품 localstorage할당
    //최근본상품이 없으면 생성
    let localarray = localStorage.getItem('watched');
    if (localarray == null) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
    else if(localarray.length>0){
        setWatched(JSON.parse(localarray));
    }
  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const ItemIndex = 6;
  const indexOfLast = currentPage * postsPerPage; //해당페이지의 마지막 인덱스(첫번째페이지가정 인덱스6)
  const indexOfFirst = indexOfLast - postsPerPage; //해당페이지의 첫번째 인덱스(첫번째페이지가정 인덱스1)


  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if(!store) return null;
  


  //여기서는 1~100 번까지 아이템이 존재하면 1~6번 이렇게 잘라서 currentPosts에 담아줍니다.
  const currentPosts = () => {
    let currentPosts = 0;
    currentPosts = store.slice(indexOfFirst, indexOfLast);
    return currentPosts;
    
  };

  return (
    <div className='page-container'>
      <Dashboard />
      <hr />
      <div className='Main-Content'> 등록된 상품</div>

      {/* 본문가운데상품진열 */}
      <div className="Item-Wrap">
        {store!=null ? (<Posts currentPosts={currentPosts()} ItemIndex={ItemIndex} watched={watched} setWatched={setWatched} />) : (<div>로딩중입니다</div>)}
      </div>

      {/* 본문하단Pagination */}
      <div className="Item-Pagination">
        {store? <Pagination
          // 총데이터를 postsPerPage만큼 등분해서 보여준다. 6개씩보여주자.
          postsPerPage={postsPerPage} //각각 페이지당 포스트개수
          totalPosts={store.length} //전체 데이터 개수 
          paginate={setCurrentPage} //CurrentPage변경하는함수.(첫번째페이지가정 6)
        ></Pagination>: null}
        
      </div>

      <div className='Main-Content'>최근 본 상품</div>
      {store?<Watched store={store} watched={watched} setWatched={setWatched}/> : null }
      {/* 본문하단 글쓰기버튼 */}
      <WriteBtn />
    </div>
  );
};

function Dashboard() {
  return (
    <div className='dashboard'>
      <div className='dashboard-right'>
        <div className='dashboard-title'>
          <h1 style={{ fontWeight: "bold", fontSize: "50px" }}>Billim</h1>
        </div>
        <div style={{ marginTop: "20px" }} className='dashboard-decoration'>
          <h1>언제어디서든지 상품을 <br /> 대여해주고 받을 수 있는 서비스입니다. </h1>
        </div>
      </div>
    </div>
  )
}




export default ItemMain;
