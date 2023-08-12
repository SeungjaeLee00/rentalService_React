import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';  // 무한 스크롤용 라이브러리


import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../NavBar';
import SearchBar from './SearchBar';


function ItemMain() {
// <<<<<<< HEAD
// =======
//     return (
//       <div className='App'>
// >>>>>>> 21d089500f02fec3291b74f310f0c0f9b77a9e96

    
  
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
          <Card />
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
  const about = "이승재 \n 조회 수 25회 ⋅ 1년 전"
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes1.jpg'} width="60%" />
      <div className='etc' style={{textAlign: 'left', marginLeft: "60px"}}>
        <h5> 3번 신은 신발 </h5>
        <p style={{color: 'gray', fontSize: "15px"}}>{about}</p>
      </div>
      
    </div>
  )
}
  
  export default ItemMain;

  // style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}