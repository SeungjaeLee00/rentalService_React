import { useLocation, useParams } from "react-router-dom"
import Posts from "./Posts";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import MessagePagination from "../../components/Pagination6";

export default function Category() {
    const [watched, setWatched] = useState([]);
    
    const [pageNum,setPageNum]=useState(0);


    // state가 null이면 검색 , id가 숫자이면 카테고리

    //카테고리클릭했을때 useLocation()으로 카테고리명 데이터 불러옴
    const { state } = useLocation();
    console.log(state);

    //id에는 사용자가 검색창에 입력한 데이터가 들어옴.(카테고리 인덱스도 있긴함)
    const id = useParams();
    console.log(id);
    const [searchtitle,setSearchTitle]=useState('');

    //stroe에 서버 api에서 불러온 데이터 
    const [store, setStore] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [length,setLength]=useState();

    let query = '';
    const SetQuery = () => {
        console.log(id.search.split(' '));
        const searcharray = id.search.split(' ');
        //검색한경우
        if (searcharray[0] == 'title') {
            query = 'title=' + searcharray[1];
            setSearchTitle(searcharray[1]);
        }
        console.log(query);
    }

    
    //검색했을경우. 
    const fetchItem = async () => {
        try {
            setError(null);
            setStore(null);
            setLoading(true);
            console.log(query);
            const response = await axios.get(`/api/posts?${query}&page=${pageNum}`);
            console.log(response);
            setStore(response.data.postList);
            setLength(response.data.totalElements);
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
            const response = await axios.get(`/api/posts?categoryName=${state}&page=${pageNum}`);
            console.log(response);
            setStore(response.data.postList);
            setLength(response.data.totalElements);
        } catch (e) {
            console.log(e);
            setError(e);
        }
        setLoading(false);
    };


    useEffect(() => {
        //검색했을때
        if (state == null) {
            SetQuery();
            fetchItem();
        }
        //카테고리클릭했을때
        else{
            fetchCategory();
        }
        //최근본상품
        let localarray = localStorage.getItem('watched');
        setWatched(JSON.parse(localarray));
    }, [state,pageNum]);

    const ItemIndex = 6;
  
    if (loading) return <div>로딩중..</div>
    if (error) return <div>에러발생</div>
    if (!store) return null;
    console.log(store);

    return (
        <div className="category-page">
            <div className="category-top">
                <div>{state ? <Div> {state} 검색결과</Div> : <Div> {searchtitle} 검색결과 </Div>} </div>
                <div className="top-right">
                    <div style={{ fontWeight: "bold" }} >{length}개의 상품</div>
                </div>
            </div>
            <div className="Item-Wrap"><Posts currentPosts={store} ItemIndex={ItemIndex} watched={watched} setWatched={setWatched} /></div>
            <MessagePagination length={length} pageNum={pageNum} setPageNum={setPageNum}  />
        </div>
    )
}

let Div = styled.div`
  font-size:15px;
  font-weight: bold;
  margin-left:5vw;
  `

let P = styled.p`
  text-align:center;
  font-size:1.2vw;
  color:red;
  font-weight:bold;
  `