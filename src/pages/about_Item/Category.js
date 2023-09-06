import { useParams } from "react-router-dom"
import store from "../../store";
import { useSelector } from "react-redux";

export default function Category()
{
    const store = useSelector((state)=>{return state});
    const id = useParams();
    console.log(id.category);
    console.log(store.category);
    return(
        <div>카테고리결과 : {store.category[id.category]}카테고리</div>
    )
}