import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from './Pagination';
import Posts from './Posts';
import WriteBtn from '../../components/WriteBtn';
import Watched from './Watched';
import Carousel from '../../components/Carousel';
import useReactQuery from '../../hooks/useReactQuery';


function ItemMain() {
  //모든상품들
  const store= useReactQuery('/api/posts');
  
  //최근본상품들
  const [watched, setWatched] = useState([]);
  let filter;

  useEffect(() => {
    //최근본상품 localstorage할당 , 최근본상품이 없으면 생성
    let localarray = localStorage.getItem('watched');
    if (localarray == null) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
    else if (localarray.length > 0) {
      setWatched(JSON.parse(localarray));
    }
  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const ItemIndex = 6;
  const indexOfLast = currentPage * postsPerPage; //해당페이지의 마지막 인덱스(첫번째페이지가정 인덱스6)
  const indexOfFirst = indexOfLast - postsPerPage; //해당페이지의 첫번째 인덱스(첫번째페이지가정 인덱스1)


  if (store.isLoading) return <div>로딩중..</div>;
  if (store.error) return <div>에러가 발생했습니다</div>;
  if (!store.data) return null;
  //console.log(store);
  
  //상품이 하나도 없으면 로컬도 0으로초기화.
  if (store.data.postList.length == 0) localStorage.setItem('watched', JSON.stringify([]));

  //여기서는 1~100 번까지 아이템이 존재하면 1~6번 이렇게 잘라서 currentPosts에 담아줍니다.
  const currentPosts = () => {
    let currentPosts = 0;
    filter = store.data.postList.filter(item => item.complete === false);
    //console.log(filter);
    currentPosts = filter.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  return (
    <div className='page-container'>
      <Dashboard />
      <hr />
      <div className='Main-Content'>등록된 상품</div>

      {/* 본문가운데상품진열 */}
      <div className="Item-Wrap">
        <Posts currentPosts={currentPosts()} ItemIndex={ItemIndex} watched={watched} setWatched={setWatched} />
      </div>

      {/* 본문하단Pagination */}
      <div className="Item-Pagination">
        <Pagination
          // 총데이터를 postsPerPage만큼 등분해서 보여준다. 6개씩보여주자.
          postsPerPage={postsPerPage} //각각 페이지당 포스트개수
          totalPosts={filter.length} //전체 데이터 개수 
          paginate={setCurrentPage} //CurrentPage변경하는함수.(첫번째페이지가정 6)
        ></Pagination>

      </div>

      <div className='Main-Content'>최근 본 상품</div>
      <Watched store={store.data.postList} watched={watched} setWatched={setWatched} />
      {/* 본문하단 글쓰기버튼 */}
      <WriteBtn />
    </div>
  );
};

function Dashboard() {
  return (
    <div className='dashboard'>
      <Carousel />
      {/* 모바일 화면일때 컴포넌트*/}
    </div>
  )
}




export default ItemMain;
