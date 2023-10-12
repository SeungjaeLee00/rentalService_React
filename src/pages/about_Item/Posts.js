import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import SetKST from "../../utils/SetKST";
import { useState } from "react";

const Posts = (props) => {
  
  const navigate = useNavigate();
  const [posts,setPosts]= useState(''); 
  const [postlength,setPostLength] =useState(props.currentPosts.length);

  useEffect(()=>{
    setPosts(props.currentPosts);
    if(props.currentPosts.length<6)
    {
      setPostLength(props.currentPosts.length);
    }
    else if(props.currentPosts.length>6)
    {
      setPostLength(props.ItemIndex);
    }
  },[props.currentPosts]);
  
  //ItemIndex가 지금 6인데 만약 게시물이 6미만이라면 오류발생. 따라서 
  //6미만이면 그에맞는 값할당. 
  
  
  //if(postlength==null) return null;

  return (
    <>
    {posts ? posts.slice(0, postlength).map(item => (
      <div className="Item" key={item.id} onClick={() => {
        let copy = [...props.watched];
        copy.push(item);
        props.setWatched(copy);
        navigate('/itemmain/detail/' + item.id, { state: item.createdTime });
        
      }}>
        <div className='Item-Img'>
          <img src={'https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post/' + item.link} style={{ width: 200, height: 200 }} />
        </div>
        <div className='Item-Information-Wrap'>
          <div className='Item-Name-Price-Date-Wrap'>
            <div className='Item-Name'>{item.title}</div>
            <div className='Item-Price'>{item.nickname}</div>
            <div className='Item-Date'>{SetKST(item.createdTime)}</div>
          </div>
          <div className='Item-State'>
            {item.state}
          </div>
        </div>
      </div>
    )) : <div>로딩중</div>}
    </>
  );
};
export default Posts;