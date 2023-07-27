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

  let [item, setItem] = useState();
  let navigate = useNavigate();  // hook: page 이동을 도와줌

  return (
    <div className='App'>
      <NavBar />
      <SearchBar />

      <div className="container" style={{marginTop: "40px"}}>
        <div className="row">

        </div>
      </div>

      <div className='upload_item' style={{position:"fixed", right: '45px', bottom: '30px'}}>
        <button style={{ borderRadius:"30px", fontSize:'20px',  width:"100px", height: "50px", border:"none" }}
                onClick={() => navigate('/itemmain/uploaditem')}> + 글쓰기 </button>
      </div> 

      
    </div>
  );
};

function Card(props){
  return (
    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}>
      <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="50%" />
      <div className='etc' style={{marginTop: "40px"}}>
        <h4>3번 신은 신발</h4>
        <p>신발 빌려드려요</p>
      </div>
    </div>
  )
}
  
  export default ItemMain;