import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';

function NavBar() {

    let [makers, setMakers] = useState(false);

    return (
        <Navbar bg="light"  variant="light"
        key={false} expand={false} className="bar">
          <Container fluid>
            <Navbar.Brand href="/">뭐든빌리개</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
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
                    {/* <NavDropdown.Divider /> */}
                    <NavDropdown.Item href="#3">악기</NavDropdown.Item>
                    <NavDropdown.Item href="#4">완구</NavDropdown.Item>
                    <NavDropdown.Item href="#5">의류</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link onClick={()=>{ setMakers(!makers) }} >뭐든빌리개를 만드는 사람들</Nav.Link>
                  {makers === true? <Makers/>: null }
                </Nav>

                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="뭐가 필요하냥"
                    className="search_button"
                    aria-label="Search"
                  />
                <Button variant="outline-success">검색</Button>
                </Form> 
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
      </Navbar>
    );
  };


  function Makers() {
    return(
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