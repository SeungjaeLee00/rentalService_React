import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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
          <Card search={search[0]} i={1} />
          <Card search={search[1]} i={2} />
          <Card search={search[2]} i={3} />
        </div>
      </div> 

      
    </div>
  );
};

function Card(props){
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%" />
      <h4>이름</h4>
      <p>설명</p>
    </div>
  )
}
  
  export default ItemMain;