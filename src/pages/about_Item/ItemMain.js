import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "./Pagination";
import Posts from "./Posts";
import WriteBtn from "../../components/WriteBtn";
import Watched from "./Watched";
import Carousel from "../../components/Carousel";
import useReactQuery from "../../hooks/useReactQuery";
import { debounce } from "@material-ui/core";

function ItemMain() {
	const [screen, setScreen] = useState(window.outerWidth);
	const handleResize = debounce(() => {
		setScreen(window.outerWidth);
	});

	//모든 상품들
	const posts = useReactQuery("/api/posts");
	//거래가 안된 상품들
	let filterPosts;

	//최근본상품
	const [watched, setWatched] = useState([]);

	useEffect(() => {
		//최근본상품 localstorage할당 , 최근본상품이 없으면 생성
		/*
    let localarray = localStorage.getItem('watched');
    if (localarray == null) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
    else if (localarray.length > 0) {
      setWatched(JSON.parse(localarray));
    }*/

		window.addEventListener("resize", handleResize);
		// console.log(screen);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6;
	const ItemIndex = 6;
	const indexOfLast = currentPage * postsPerPage; //해당페이지의 마지막 인덱스(첫번째페이지가정 인덱스6)
	const indexOfFirst = indexOfLast - postsPerPage; //해당페이지의 첫번째 인덱스(첫번째페이지가정 인덱스1)

	if (posts.isLoading) return <div>로딩중..</div>;
	if (posts.error) return <div>에러가 발생했습니다</div>;
	if (!posts.data) return null;

	//상품데이터가 없으면 로컬0으로 초기화
	if (posts.data.postList.length == 0) localStorage.setItem("watched", JSON.stringify([]));

	//1~100 번까지 데이터가 존재하면 1~6번 6개씩 잘라서 currentPosts에 담아줍니다.
	const currentPosts = () => {
		let currentPosts = 0;
		filterPosts = posts.data.postList.filter((item) => item.complete === false);
		//console.log(filterPosts);
		currentPosts = filterPosts.slice(indexOfFirst, indexOfLast);
		return currentPosts;
	};

	return (
		<div className="page-container">
			<Dashboard screen={screen} />
			<hr />
			<div className="Main-Content">등록된 상품</div>

			{/* 가운데 상품  */}
			<div className="Item-Wrap">
				<Posts currentPosts={currentPosts()} ItemIndex={ItemIndex} watched={watched} setWatched={setWatched} />
			</div>

			{/* Pagination */}
			<div className="Item-Pagination">
				<Pagination
					postsPerPage={postsPerPage} //각각 페이지당 포스트개수
					totalPosts={filterPosts.length} //전체 데이터 개수
					paginate={setCurrentPage} //CurrentPage변경하는함수.(첫번째페이지가정 6)
				></Pagination>
			</div>

			<div className="Main-Content">최근 본 상품</div>
			{/* <Watched store={posts.data.postList} watched={watched} setWatched={setWatched} /> */}
			{/* 본문하단 글쓰기버튼 */}
			<WriteBtn />
		</div>
	);
}

function Dashboard({ screen }) {
	return (
		<div className="dashboard">
			<Carousel screen={screen} />
			{/* 모바일 화면일때 컴포넌트*/}
		</div>
	);
}

export default ItemMain;
