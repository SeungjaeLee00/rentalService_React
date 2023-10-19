import { useLocation, useParams } from "react-router-dom"
import Posts from "./Posts";
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";


export default function Category() {
    const [watched, setWatched] = useState([]);
    const [filtername,setFilterName]=useState('최신순');

    // state가 null이면 검색
    // id가 숫자이면 카테고리

    //id에는 사용자가 검색창에 입력한 데이터가 들어옴.(카테고리 인덱스도 있긴함)
    const id = useParams();
    //console.log(id);

    //카테고리클릭했을때 useLocation()으로 카테고리명 데이터 불러옴
    const { state } = useLocation();
    //console.log(state);


    //stroe에 서버 api에서 불러온 데이터 
    const [store, setStore] = useState();

    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchItem = async () => {
        try {
            //요청이 시작할때 error와 items를 초기화
            setError(null);
            setItems(null);
            //loading 상태를 treu
            setLoading(true);
            const response = await axios.get(`/api/posts?title=${id.search}`);
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
    const sortLatestItem = () =>{
        setFilterName('최신순');
        let temp =[...store];
        temp=temp.sort((a,b)=>{
            if(a.createdTime>b.createdTime) return 1;
            if(a.createdTime<b.createdTime) return -1;
            return 0;
        })
        setStore(temp);
    }
    //필터 가격낮은순 클릭 실행 함수
    const sortLowerItem = () =>{
        setFilterName('가격낮은순');
        let temp=[...store];
        temp = temp.sort((a,b)=>(a.itemPrice-b.itemPrice));
        setStore(temp);
    }
    //필터 가격높은순 클릭 실행 함수
    const sortHigherItem = () =>{
        setFilterName('가격높은순');
        let temp =[...store];
        temp = temp.sort((a,b)=>(b.itemPrice-a.itemPrice));
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

    }, [state]);

    if (loading) return <div>로딩중..</div>
    if (error) return <div>에러발생</div>
    if (!store) return null;

    return (

        <div className="category-page">
            <div className="category-top">
                <div>{state ? <Div> {state} 검색결과</Div> : <Div> {id.search} 검색결과 </Div>} </div>
                <div className="top-right">
                    <div style={{fontWeight:"bold"}} >{store.length}개의 상품</div>
                     <Dropdown style={{ marginLeft:"15px"}}>
                        <Dropdown.Toggle style={{ background: "white", color: "black",borderColor:"black" }} 
                        variant="success" id="dropdown-basic">{filtername}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item key={1} onClick={()=>{sortLatestItem()}} >최신순</Dropdown.Item>
                            <Dropdown.Item key={3} onClick={()=>{sortLowerItem()}} >가격낮은순</Dropdown.Item>
                            <Dropdown.Item key={4} onClick={()=>{sortHigherItem()}}>가격높은순</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="Item-Wrap"><Posts currentPosts={store} ItemIndex={6} watched={watched} setWatched={setWatched} /></div>


        </div>
    )
}

let Div = styled.div`
  font-size:30px;
  font-weight: bold;
  `