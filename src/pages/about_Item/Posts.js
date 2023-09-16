import React from "react";
import { useNavigate } from "react-router";



const Posts = (props) => {
  const navigate = useNavigate();
  //UTC -> 한국시간으로 바꿔주는 함수.
  function time(itemtime) {
   const kor = new Date(itemtime);
   kor.setHours(kor.getHours()+9);
   return kor.toLocaleString();
  }
  
  return (
    props.currentPosts ? props.currentPosts.slice(0, props.ItemIndex).map(item => (
      <div className="Item" key={item.id} onClick={() => {
        navigate('/itemmain/detail/' + item.id, { state: item.createdTime });
      }}>
        <div className='Item-Img'>
          <img src={'https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post/' + item.link} style={{ width: 200, height: 200 }} />
        </div>
        <div className='Item-Information-Wrap'>
          <div className='Item-Name-Price-Date-Wrap'>
            <div className='Item-Name'>{item.title}</div>
            <div className='Item-Price'>{item.nickname}</div>
            <div className='Item-Date'>{time(item.createdTime)}</div>
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