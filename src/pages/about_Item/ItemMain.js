import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/img/logo2.PNG';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from './Pagination';
import Posts from './Posts';
import WriteBtn from '../../components/WriteBtn';
import fetchMyInfo from '../../apis/FetchMyInfo';

function ItemMain() {
  const navigate = useNavigate();
  const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;

  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,setError]=useState(null);

  const[myinfo,setMyInfo]=useState();

  const fetchPosts = async() =>{
    try{
      //요청시작할때 error와 store 초기화
      setError(null);
      setStore(null);
      //loading 상태를 true
      setLoading(true);
      const response = await axios.get('/posts');
      console.log(response.data.result.data.postList);
      setStore(response.data.result.data.postList);
    }catch(e){
      setError(e);
    }
    setLoading(false);
  }  
  const fetchMyInfo = async()=>{
    try{
      const response = await axios.get('/members/my-profile', {
        headers: { Authorization: `Bearer ${actoken}` },
        headers: { Auth: retoken }
    })
    console.log(response);
    setMyInfo(response.data.result.data);
    //sessionstorage에 저장
    window.sessionStorage.setItem("nickname", response.data.result.data.nickname);
    }catch(e){
      console.log(e);
    }
  }


  useEffect(() => {
    fetchPosts();
    fetchMyInfo();
  }, [])
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const ItemIndex =6;
  const indexOfLast = currentPage * postsPerPage; //해당페이지의 마지막 인덱스(첫번째페이지가정 인덱스6)
  const indexOfFirst = indexOfLast - postsPerPage; //해당페이지의 첫번째 인덱스(첫번째페이지가정 인덱스1)

  //여기서는 1~100 번까지 아이템이 존재하면 1~6번 이렇게 잘라서 currentPosts에 담아줍니다.
  const currentPosts = () => {
    let currentPosts = 0;
    currentPosts = store.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  if(loading) return <div>로딩중..</div>;
  if(error) return <div>에러가 발생했습니다</div>;

  return (
    <div className='page-container'>

      <Dashboard /> 
      <hr />
      <div className='Main-Content'> 방금 등록된 상품</div>

      {/* 본문가운데상품진열 */}
      <div className="Item-Wrap">
        {currentPosts ? (<Posts currentPosts={currentPosts()} ItemIndex={ItemIndex} />) : (<div>로딩중입니다</div>)}
      </div>

      {/* 본문하단Pagination */}
      <div className="Item-Pagination">
        <Pagination
          // 총데이터를 postsPerPage만큼 등분해서 보여준다. 6개씩보여주자.
          postsPerPage={postsPerPage} //각각 페이지당 포스트개수
          totalPosts={store.length} //전체 데이터 개수 
          paginate={setCurrentPage} //CurrentPage변경하는함수.(첫번째페이지가정 6)
        ></Pagination>
      </div>

      {/* 본문하단 글쓰기버튼 */}
        <WriteBtn/>
    </div>
  );
};

function Dashboard() {
  return (
    <div className='dashboard'>
      <div className='dashboard-right'>
        <div className='dashboard-title'>
          <h1 style={{ fontWeight: "bold", fontSize: "50px" }}>뭐든빌리개는</h1>
        </div>
        <div style={{ marginTop: "20px" }} className='dashboard-decoration'>
          <h1>언제어디서든지 상품을 <br /> 대여해주고 받을 수 있는 서비스입니다. </h1>
        </div>
      </div>
      <div className='dashboard-left'>
        <img style={{ width: "350px", height: "200px", paddingBottom: "30px", paddingLeft: "100px", marginLeft: "100px" }} src={Logo}></img>
      </div>
    </div>
  )
}




export default ItemMain;
