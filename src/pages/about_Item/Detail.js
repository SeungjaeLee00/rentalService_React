import { useState, useRef, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { useInView } from 'react-intersection-observer';  // 무한 스크롤용 라이브러리

import '../../App.css';
import CommentInput from '../about_Item/commentInput';
import 'bootstrap/dist/css/bootstrap.min.css';

function Detail () {

    let navigate = useNavigate();  
    const [comments, setComments] = useState([
        { id: 1, name: 'Minjoo Park', content: 'I like it!', }
      ]);
    
      const nextId = useRef(1);
    
      const onInsert = useCallback(
        (name, content) => {
          const comment = {
            id: nextId.current,
            name,
            content
          };
          console.log(name);
          console.log(content);
          setComments(comments => comments.concat(comment));
          nextId.current += 1; //nextId 1씩 더하기
        },
        [comments],
      );

    return(
        <div className='App'>
            <h1>상품 디테일</h1>
            <CommentInput onInsert={onInsert} />

            <div className='upload_item' style={{position:"fixed", right: '45px', bottom: '30px'}}>
                <button style={{ borderRadius:"30px", fontSize:'20px',  width:"100px", height: "50px", border:"none" }}
                        onClick={() => navigate('/itemmain/upload-item')}> + 글쓰기 </button>
            </div> 
        </div>
    )
}

export default Detail;