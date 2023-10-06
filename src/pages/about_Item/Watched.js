import { useEffect, useState } from "react"
import Posts from "./Posts";

//최근본상품 컴포넌트 
export default function Watched(props) {
    //watched에 상품의 정보들이 담긴다. 
    const [watched, setWatched] = useState();

    useEffect(() => {
        let localarray = localStorage.getItem('watched');
        //localStorage watche에 상품들의 id가 존재하면 
        if (localarray) {
            localarray = JSON.parse(localarray);
            let copy = [];
            //해당 상품의 정보를 copy에 unshift로 앞에서 부터 넣는다. 
            localarray.map((a, index) => {
                let itemindex = 0;
                itemindex = props.store.findIndex(item => Number(item.id) == Number(a))
                console.log(itemindex);
                if (itemindex > 0) {
                    copy.unshift(props.store[itemindex]);
                }
            })
            //copy를 state 배열에 저장해준다. 
            setWatched(copy);
        }
    }, [])

    //최근본상품은 3개의 상품만 보여주기 때문에 아래와 같이 설정. 
    const currentPosts = () => {
        let currentPosts = 0;
        currentPosts = watched.slice(0, 3);
        return currentPosts;
    };
    if (!watched) return null;

    return (
        <div className='Item-Wrap'>
            {/* currentPosts에 위의 watched에 담긴 상품들을 전달 */}
            <Posts currentPosts={currentPosts()}/>
        </div>
    )
}