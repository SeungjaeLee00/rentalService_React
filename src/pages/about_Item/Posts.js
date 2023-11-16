import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import SetKST from "../../utils/SetKST";
import { useState } from "react";

const Posts = (props) => {
  console.log(props.currentPosts);
  const navigate = useNavigate();
  const [posts,setPosts]= useState([]); 
  const [postlength,setPostLength] =useState(props.currentPosts.length);

  useEffect(()=>{
    setPosts(props.currentPosts);
    //페이지의 아이템의 개수가 6개미만이면 그에 맞는 길이(개수)만큼 길이설정
    if(props.currentPosts.length<6)
    {
      setPostLength(props.currentPosts.length);
    }//페이지의 개수가 6개면 포스트 길이 6개 즉 개수가 6개 
    else if(props.currentPosts.length>=6)
    {
      setPostLength(props.ItemIndex);
    }
   
  },[props.currentPosts]);

  if(!posts||posts.length===0) return null;
  //초기에 posts에 undefined값이 들어오는 현상 발생 -> 예외처리
  if(posts[0]==undefined) return null;
  
  return (
    <>
    {posts&&posts.length>0? posts.slice(0, postlength).map(item => (
      <div className="Item" key={item.id} onClick={() => {
        let copy = [...props.watched];
        copy.push(item);
        props.setWatched(copy);
        navigate('/itemmain/detail/' + item.id, { state: item.createdTime });
      }}>
        <div className='Item-Img'>
          <img src={'https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post/'+item.link } style={{ width: 200, height: 200 }} />
        </div>
        <div className='Item-Information-Wrap'>
          <div className='Item-Name-Price-Date-Wrap'>
            <div className='Item-Name'>{item.title}</div>
            <div className='Item-Price'>{String(item.itemPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
            <div className='Item-Date'>{SetKST(item.createdTime)}</div>
          </div>
          <div className='Item-State'>
            {item.complete==true ? <p style={{color:"red"}}>대여중</p>:<p></p>}
          </div>
        </div>
      </div>
    )) : <div>로딩중</div>}
    </>
  );
};
export default Posts;