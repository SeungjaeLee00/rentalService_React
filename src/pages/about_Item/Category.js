import { useLocation, useParams } from "react-router-dom"
import store from "../../store";
import { useSelector } from "react-redux";
import Posts from "./Posts";
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";


export default function Category() {
   
    //id에는 사용자가 검색창에 입력한 데이터가 들어옴.(카테고리 인덱스도 있긴함)
    const id = useParams(); 
    console.log(id);

    //카테고리클릭했을때 useLocation()으로 카테고리명 데이터 불러옴
    const {state} = useLocation();
    console.log(state);

    // state가 null이면 검색
    // id가 숫자이면 카테고리

    //stroe에 서버 api에서 불러온 데이터 
    const [store, setStore] = useState();
    
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(null);

    const fetchItem = async()=>{
        try{
            //요청이 시작할때 error와 items를 초기화
            setError(null);
            setItems(null);
            //loading 상태를 treu
            setLoading(true);
            const response = await axios.get(`/posts?title=${id.search}`);
            console.log(response);
            setStore(response.data.result.data.postList);
        }catch(e){
            if (e.response.data.code == '511') {
                alert('로그인이 만료되어 로그인 페이지로 이동합니다');
                window.location.replace('/loginpage');
            }
            setError(e);

         }
        setLoading(false);
    };

    const fetchCategory = async()=>{
        try{
            setError(null);
            setStore(null);
            setLoading(true);
            const response = await axios.get(`/posts?categoryName=${state}`);
            console.log(response);
            setStore(response.data.result.data.postList);
        }catch(e){
            setError(e);
        }
        setLoading(false);
    };
     

    useEffect(()=>{
        //검색했을때
        if(state==null)
        {
            fetchItem();
        }
        //카테고리클릭했을때
        else
        {
            fetchCategory();            
        }
    },[state]);

    if(loading) return <div>로딩중..</div>
    if(error) return <div>에러발생</div>

    return (

        <div className="category_page">
            {store ? <div> <div className="category_top">
                <div style={{ fontSize: "27px" }}>{state ?<div> {state} 검색결과</div>: <div> {id.search} 검색결과 </div>} </div>
                <div style={{ marginLeft: "800px" }}>{store.length}개의 상품</div>
                <div style={{ marginLeft: "30px" }}> <Dropdown style={{ marginBottom: "10px" }}>
                    <Dropdown.Toggle style={{ background: "white", color: "black" }} variant="success" id="dropdown-basic">
                        추천순
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item key={1} href="#/action-1">추천순</Dropdown.Item>
                        <Dropdown.Item key={2} href="#/action-2">최신순</Dropdown.Item>
                        <Dropdown.Item key={3} href="#/action-3">가격낮은순</Dropdown.Item>
                        <Dropdown.Item key={4} href="#/action-4">가격높은순</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown></div>
            </div>
                <div className="Item-Wrap"><Posts currentPosts={store} ItemIndex={6} /></div>
             </div> : <div>로딩중입니다</div>}

        </div>
    )
}