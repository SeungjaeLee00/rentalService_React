import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';  // 무한 스크롤용 라이브러리


import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../NavBar';
import SearchBar from './SearchBar';

function ItemMain() {
    
  
  const [search, setSearch] = useState("");
  const onChange = (e) => {
          setSearch(e.target.value)
      }

  let [item, setItem] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let navigate = useNavigate();  

  return (
    <div className='App'>
      
      <SearchBar />

      <div className="container" style={{marginTop: "40px"}}>
        <div className="row">
          {item.map(function(){return(<Card />)})}
        </div>
      </div>

      <div className='upload_item' style={{position:"fixed", right: '45px', bottom: '30px'}}>
        <button style={{ borderRadius:"30px", fontSize:'20px',  width:"100px", height: "50px", border:"none" }}
                onClick={() => navigate('/itemmain/upload-item')}> + 글쓰기 </button>
      </div> 

      
    </div>
  );
};

function Card(props){

  let navigate = useNavigate();
  
  const about = "이승재 \n 조회 수 회 ⋅ 1초 전"

  return (
    <div className="col-md-4" style={{ marginBottom: "30px" }}
          onClick={() =>  navigate('/itemmain/detail')}>
      <img src={'https://codingapple1.github.io/shop/shoes1.jpg'} width="60%" />
      <div className='etc' style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
        <div  style={{textAlign: 'left', marginLeft: "60px"}}>
          <h5> 3번 신은 신발 </h5>
          <p style={{color: 'gray', fontSize: "15px"}}>{about}</p>
        </div>
        <div style={{textAlign: 'right'}}>
          <p style={{color: 'green', fontSize: "12px"}}>대여 가능</p>
        </div>
        
        
      </div>
      
    </div>
  )
}
  
  export default ItemMain;

  // style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}