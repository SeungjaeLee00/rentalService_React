import { useLocation, useParams } from "react-router-dom"
import store from "../../store";
import { useSelector } from "react-redux";
import Posts from "./Posts";
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";


export default function Category() {

    const id = useParams(); //id.category에 카테고리 인덱스
    console.log(id);

    const {state} = useLocation();
    console.log(state);


    const [store, setStore] = useState();
    const [category, setCategory] = useState();

    const [temp, setTemp] = useState();

    useEffect(() => {
            axios.get("/posts?categoryName="+state)
            .then(response => {
                console.log('카테고리페이지 post api 성공');
                console.log(response.data.result.data.postList);
                setStore(response.data.result.data.postList);
            })
    }, [state])

    // useEffect(() => {
    //         axios.get('/category')
    //         .then(response=>{
    //            console.log("카테고리 axios성공");
    //            console.log(response.data.result.data[1].children);
    //            response.data.result.data[1].children.map((data)=>{

    //             if(id.category==data.id)
    //             {
    //                 setTemp(data.name);
    //                 console.log(data.name);
    //             }
    //            })
    //            setCategory(response.data.result.data[1].children);
    //         })
    //         .catch(error=>{
    //            console.log("카테고리 axios실패")
    //            console.log(error.response.data.result);
    //         })
    // },[])

    // useEffect(()=>{
    //     axios.get('/posts?categoryName=의류')
    //         .then(response => {
    //             console.log('카테고리페이지 post api 성공');
    //             console.log(response.data.result.data.postList);
    //             setStore(response.data.result.data.postList);
    //         })
    // },[temp])




    //category에서 카테고리 인덱스에 맞는 카테고리명 찾아서
    //categoryname에 저장
    let categoryname = "";
    




    return (

        <div className="category_page">
            {store ? <div> <div className="category_top">
                <div style={{ fontSize: "27px" }}>{state} 카테고리 검색결과</div>
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
                <div>메인하단바</div> </div> : <div>로딩중입니다</div>}

        </div>
    )
}