import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import SetKST from "../../utils/SetKST";

const Posts = (props) => {
  
  const navigate = useNavigate();
  //console.log(props.currentPosts);
  
  
 
  if(!props.currentPosts) return null;
  

  return (
    props.currentPosts ? props.currentPosts.slice(0, props.ItemIndex).map(item => (
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
    )) : <div>로딩중</div>
  );
};
export default Posts;