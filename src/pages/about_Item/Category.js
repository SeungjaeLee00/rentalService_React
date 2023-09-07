import { useParams } from "react-router-dom"
import store from "../../store";
import { useSelector } from "react-redux";
import Posts from "./Posts";
import Dropdown from 'react-bootstrap/Dropdown';

export default function Category() {
    const store = useSelector((state) => { return state });
    const id = useParams(); //id.category에 카테고리 인덱스


    //category redux에서 카테고리 인덱스에 맞는 카테고리명 찾아서
    //categoryname에 저장
    let categoryname = "";
    store.category.map((a, index) => {

        if (index == Number(id.category)) {

            categoryname = a;
        }
    })
    console.log(categoryname);

    //item에서 categoryname에 맞는 아이템들만 출력
    const categoryitem = store.item.filter((data, index) => {
        if (data.category == categoryname) {

            return data;
        }
    })

    console.log(categoryitem);

    return (
        <div className="category_page">
            <div className="category_top">
                <div style={{ fontSize: "27px" }}>{categoryname} 카테고리 검색결과</div>
                <div style={{ marginLeft: "800px" }}>{categoryitem.length}개의 상품</div>
                <div style={{ marginLeft: "30px" }}> <Dropdown style={{marginBottom:"10px"}}>
                    <Dropdown.Toggle style={{background:"white" , color:"black"}} variant="success" id="dropdown-basic">
                        추천순
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">추천순</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">최신순</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">가격낮은순</Dropdown.Item>
                        <Dropdown.Item href="#/action-4">가격높은순</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown></div>
            </div>
            <div className="Item-Wrap"><Posts currentPosts={categoryitem} ItemIndex={6} /></div>
            <div>메인하단바</div>
        </div>
    )
}