import { useLocation, useParams } from "react-router-dom"
import Posts from "./Posts";
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import MessagePagination from "../../components/Pagination";

export default function Category() {
    const [watched, setWatched] = useState([]);
    const [filtername, setFilterName] = useState('최신순');

    // state가 null이면 검색 , id가 숫자이면 카테고리

    //카테고리클릭했을때 useLocation()으로 카테고리명 데이터 불러옴
    const { state } = useLocation();
    console.log(state);

    //id에는 사용자가 검색창에 입력한 데이터가 들어옴.(카테고리 인덱스도 있긴함)
    const id = useParams();
    console.log(id);
    const [searchtitle,setSearchTitle]=useState('');
    const [searcherror,setSearchError] = useState('');
    let query = '';
    const SetQuery = () => {
        console.log(id.search.split(' '));
        const searcharray = id.search.split(' ');
        if (Number(searcharray[0])>=0)
        {
            console.log('Number');
            query = `categoryName=${searcharray[0]}`;
            setSearchTitle(searcharray[0]);
        }
        //게시글제목으로 검색한경우.
        else if (searcharray[0] == 'title') {
            query = 'title=' + searcharray[1];
            setSearchTitle(searcharray[1]);
        }
        //카테고리로 필터 클릭후 검색한경우.
        else if (searcharray[0] == 'categoryName') {
            console.log('카테고리 클릭');
            //카테고리명 + 제품  검색할때 ex)'전자제품 소니' 
            if (searcharray[2] != null) {
                query = 'categoryName=' + searcharray[1] + '&title=' + searcharray[2];
                setSearchTitle(searcharray[2]);
            }
            //제품, 카테고리 한개만 입력하여 검색한경우 
            else setSearchError('카테고리, 제품을 입력해주세요 ex)가전제품 아이폰');
        }
        console.log(query);

    }

    //stroe에 서버 api에서 불러온 데이터 
    const [store, setStore] = useState();

    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //검색했을경우. 
    const fetchItem = async () => {
        try {
            setError(null);
            setItems(null);
            setLoading(true);
            const response = await axios.get(`/api/posts?${query}`);
            console.log(response);
            setStore(response.data.postList);
        } catch (e) {
            if (e.response.data.code == '511') {
                alert('로그인이 만료되어 로그인 페이지로 이동합니다');
                window.location.replace('/loginpage');
            }
            console.log(e);
            setError(e);

        }
        setLoading(false);
    };
    const fetchCategory = async () => {
        try {
            setError(null);
            setStore(null);
            setLoading(true);
            const response = await axios.get(`/api/posts?categoryName=${state}`);
            console.log(response);
            setStore(response.data.postList);
        } catch (e) {
            console.log(e);
            setError(e);
        }
        setLoading(false);
    };
    //필터 최신순 클릭 실행 함수 
    const sortLatestItem = () => {
        setFilterName('최신순');
        let temp = [...store];
        temp = temp.sort((a, b) => {
            if (a.createdTime > b.createdTime) return 1;
            if (a.createdTime < b.createdTime) return -1;
            return 0;
        })
        setStore(temp);
    }
    //필터 가격낮은순 클릭 실행 함수
    const sortLowerItem = () => {
        setFilterName('가격낮은순');
        let temp = [...store];
        temp = temp.sort((a, b) => (a.itemPrice - b.itemPrice));
        setStore(temp);
    }
    //필터 가격높은순 클릭 실행 함수
    const sortHigherItem = () => {
        setFilterName('가격높은순');
        let temp = [...store];
        temp = temp.sort((a, b) => (b.itemPrice - a.itemPrice));
        setStore(temp);
    }


    useEffect(() => {
        //검색했을때
        if (state == null) {
            fetchItem();
        }
        //카테고리클릭했을때
        else {
            fetchCategory();
        }
        //최근본상품
        let localarray = localStorage.getItem('watched');
        setWatched(JSON.parse(localarray));
        return()=>{
            //검색했을때 get의 url주소 + 변수값(검색에 따라 유동적) 설정
            SetQuery();
        }

    }, [state]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;
    const ItemIndex = 6;
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    //pagenumbers state 변경함수. 아래 페이지네이션 번호 클릭할때 해당 번호의 값이 들어온다. 
    const HandlePageNumbers = (x) => {
        setCurrentPage(x);
    }

    const currentPosts = () => {
        let currentPosts = store.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }

    if (loading) return <div>로딩중..</div>
    if (error) return <div>에러발생</div>
    if (!store) return null;

    return (

        <div className="category-page">
            {searcherror ? <P>{searcherror}</P> : null}
            <div className="category-top">
                <div>{state ? <Div> {state} 검색결과</Div> : <Div> {searchtitle} 검색결과 </Div>} </div>
                <div className="top-right">
                    <div style={{ fontWeight: "bold" }} >{store.length}개의 상품</div>
                    {/* react bootstrap으로 필터 드랍다운 구현 */}
                    <Dropdown style={{ marginLeft: "15px" }}>
                        <Dropdown.Toggle style={{
                            background: "white", color: "black",
                            borderColor: "black", fontWeight: "bold"
                        }}
                            variant="success" id="dropdown-basic">{filtername}
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                            <Dropdown.Item key={1} onClick={() => { sortLatestItem() }} >최신순</Dropdown.Item>
                            <Dropdown.Item key={3} onClick={() => { sortLowerItem() }} >가격낮은순</Dropdown.Item>
                            <Dropdown.Item key={4} onClick={() => { sortHigherItem() }}>가격높은순</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="Item-Wrap"><Posts currentPosts={currentPosts()} ItemIndex={ItemIndex} watched={watched} setWatched={setWatched} /></div>
            <MessagePagination length={store.length} HandlePageNumbers={HandlePageNumbers} />


        </div>
    )
}

let Div = styled.div`
  font-size:2vw;
  font-weight: bold;
  margin-left:5vw;
  `

let P = styled.p`
  text-align:center;
  font-size:1.2vw;
  color:red;
  font-weight:bold;
  `