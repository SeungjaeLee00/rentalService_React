import { useState, useRef, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';  // 무한 스크롤용 라이브러리

import '../../App.css';
import HorizonLine from '../HorizonLine';
import 'bootstrap/dist/css/bootstrap.min.css';

function Detail () {

    let navigate = useNavigate();  
    // const [comments, setComments] = useState([
    //     { id: 1, content: 'I like it!' }
    //   ]);
    
    // const nextId = useRef(1);
    
    // const onInsert = useCallback(
    //     (content) => {
    //       const comment = {
    //         id: nextId.current,
    //         content
    //       };
    //       console.log(content);
    //       setComments(comments => comments.concat(comment));
    //       nextId.current += 1; 
    //     },
    //     [comments],
    //   );

    // const [value, setValue] = useState({
    //     content: ''
    // });

    // const onChangeContent = useCallback(
    //     (e) => {
    //         setValue({
    //             content: e.target.value,
    //         });
    //     },
    //     [value]
    // );

    // const onSubmit = useCallback(
    //     e => {
    //         onInsert(value.content);
    //         setValue({
    //             content: ''
    //         });

    //         e.preventDefault();
    //     },
    //     [onInsert, value],
    // );

    return(
        <div className='App'>

        {/* 여기다가 나머지 구현하면 댐 */}

        {/* <HorizonLine />

            <div style={{ padding: "20px" }}>
                <h3>댓글</h3>
                <form className="CommentInsert" onSubmit={onSubmit}
                    style={{ display:'flex' }}>
                    <textarea placeholder="    댓글을 입력하세요."
                        cols="90"
                        rows="2"
                        style={{ background_color: "transparent", 
                        border: "2px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: "7px", marginLeft: "270px" }}
                        value={value.content}
                        onChange={onChangeContent}
                    />
                    <button type="submit" style={{ border:'none', marginLeft: "5px" }}>보내기</button>
                </form>
            </div>

            <div className='upload_item' style={{position:"fixed", right: '45px', bottom: '30px'}}>
                <button style={{ borderRadius:"30px", fontSize:'20px',  width:"100px", height: "50px", border:"none" }}
                        onClick={() => navigate('/itemmain/upload-item')}> + 글쓰기 </button>
            </div>  */}
        </div>
    )
}

export default Detail;