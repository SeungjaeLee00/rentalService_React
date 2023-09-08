import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Category from '../pages/about_Item/Category.js';
import store from '../store';
import { useSelector } from 'react-redux';
import HorizonLine from './HorizonLine';

function NavBar() {

  let store = useSelector((state) => { return state });


  const [isLogin, setIsLogin] = useState(false);
  const [makers, setMakers] = useState(false);
  let navigate = useNavigate();  // hook: page 이동을 도와줌
  const [view, setView] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  console.log(isAuthenticated);
  const handleLogout = () => {
    logout()
    window.location.replace("/");
    setIsLogin(prevState => !prevState)
  };

  const handleLogin = () => {
    window.location.replace("/loginpage")
    setIsLogin(prevState => !prevState)
  };

  return (
    <Navbar style={{ height: "100px" }} bg="light" variant="light"
      key={false} expand={false} className="bar">
      <Container fluid>

        <Navbar.Brand style={{ fontSize: "30px", marginTop:"25px", fontWeight:"bold" }} href="/">뭐든빌리개</Navbar.Brand>
        <NavDropdown className='nav-category'
          title="카테고리"
          id={`offcanvasNavbarDropdown-expand-${false}`}
        >
          {store.category.map((a, index) => (

            <NavDropdown.Item key={index} onClick={() => {
              navigate("category/" + index);
            }}>{a}</NavDropdown.Item>
          ))}

        </NavDropdown>
        
        <Form className="d-flex" style={{marginLeft:"100px"}}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            style={{width:"400px"}}
          />
          <Button variant="outline-success">Search</Button>
        </Form>
         {isAuthenticated ? (
          <Button onClick={handleLogout}
            variant="outline-dark" size="sm" style={{ marginLeft: "700px" }}>로그아웃</Button>
        ) : (
          <Link onClick={handleLogin}
            variant="outline-dark" size="sm" style={{ marginLeft: "650px" }}>로그인/회원가입</Link>)} 

        <Navbar.Toggle style={{marginTop:"25"}} aria-controls={`offcanvasNavbar-expand-${false}`} />
        
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${false}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="sub" id={`offcanvasNavbarLabel-expand-${false}`}>
              뭐든빌리개
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="item_list">
              <NavDropdown
                title="물건"
                id={`offcanvasNavbarDropdown-expand-${false}`}
              >
                <NavDropdown.Item href="#1">가전제품</NavDropdown.Item>
                <NavDropdown.Item href="#2">생활용품</NavDropdown.Item>
                <NavDropdown.Item href="#3">악기</NavDropdown.Item>
                <NavDropdown.Item href="#4">완구</NavDropdown.Item>
                <NavDropdown.Item href="#5">의류</NavDropdown.Item>
                <NavDropdown.Item href="#6">기타</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="리뷰 게시판"
                id={`offcanvasNavbarDropdown-expand-${false}`}
              >
                <NavDropdown.Item href='/reviews/my-review'>받은 리뷰보기</NavDropdown.Item>
                <NavDropdown.Item href='/reviews/write-review'>리뷰 작성하기</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="마이페이지"
                id={`offcanvasNavbarDropdown-expand-${false}`}
              >
                <NavDropdown.Item href='/my-page/myitempage'>내 게시물 보기</NavDropdown.Item>
                <NavDropdown.Item href='/my-page/upload-item'>내 물건 올리기</NavDropdown.Item>
                <NavDropdown.Item href='/my-page/all-trades'>거래 내역 조회</NavDropdown.Item>
                <NavDropdown.Item href='/my-page/chats'>쪽지함</NavDropdown.Item>
                <NavDropdown.Item href='/my-page/reports'>신고함</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown title="설정" style={{ marginLeft: "20px", marginRight: "20px", marginBottom: "5px" }}>
                  <NavDropdown.Item href='/my-page/edit-membership'>회원정보 수정</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>로그아웃</NavDropdown.Item>
                </NavDropdown>
              </NavDropdown>

              <Nav.Link onClick={() => { setMakers(!makers) }} >뭐든빌리개를 만드는 사람들</Nav.Link>
              {makers === true ? <Makers /> : null}
            </Nav>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="무엇이 필요하세요?"
                className="search_button"
                aria-label="Search"
              />
              <Button variant="outline-success" style={{ width: "100px", height: "50px" }}>검색</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
      
    </Navbar>


  );
};


function Makers() {
  return (
    <div className='Makers'>
      <div className='row'>
        <div> 백엔드 개발자
          <h5>김동웅 & 박영재</h5>
        </div>
        <div>프론트엔드 개발자
          <h5>이승재 & 최명수</h5>
        </div>
      </div>
    </div>
  )
}

export default NavBar;