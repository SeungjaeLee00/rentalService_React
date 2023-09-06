import { useParams } from "react-router-dom"
import store from "../../store";
import { useSelector } from "react-redux";
import Posts from "./Posts";

export default function Category()
{
    const store = useSelector((state)=>{return state});
    const id = useParams(); //id.category에 카테고리 인덱스
    
    
    //category redux에서 카테고리 인덱스에 맞는 카테고리명 찾아서
    //categoryname에 저장
    let categoryname = "";
    store.category.map((a,index)=>{
        
        if(index==Number(id.category))
        {
            
            categoryname=a;            
        }
    })
    console.log(categoryname);
    
    //item에서 categoryname에 맞는 아이템들만 출력
    const categoryitem = store.item.filter((data,index)=>{
        if(data.category==categoryname)
        {
            
            return data;
        }
    })
    
    console.log(categoryitem);

    return(
        <div className="category_page">
            <div className="category_top">
                <div style={{fontSize:"27px"}}>{categoryname} 카테고리 검색결과</div>
                <div style={{marginLeft:"800px"}}>{categoryitem.length}개의 상품</div>
                <div style={{marginLeft:"30px"}}>찜많은순,가격낮은순 등(드랍박스예정)</div>
            </div>
            <div className="Item-Wrap"><Posts currentPosts={categoryitem} ItemIndex={6}/></div>
            <div>메인하단바</div>
        </div>
    )
}