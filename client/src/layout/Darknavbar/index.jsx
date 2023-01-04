import React from 'react'
// import { profile, about } from './pages'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../reducer'


// import About from '../../pages/About';


function Darknavbar() {
  // const auth= localStorage.getitem("user")
  // const navigate = useNavigate()
  // const logout=()=>{
  //   localStorage.clear();
  //   navigate("/Auth")
  const dispatch = useDispatch()
  const items = useSelector(state => state)
  let user = localStorage.getItem('user')

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="primary" variant="dark" className="mx-5">
        <Container>
          <Navbar.Brand href="#home"><i class="bi bi-cart-check"></i> Smart-Cart</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            

            <Nav className="me-auto">
              <Nav.Link href="/"><i class="bi bi-house"></i> Home</Nav.Link>
              <Nav.Link href="/about"><i class="bi bi-question-circle"></i> About</Nav.Link>
              {!user ? (
                <Nav.Link href="/Auth"><i class="bi bi-box-arrow-in-right"></i> Login</Nav.Link>
              ) : (
                  <>
                    <Nav.Link href="/profile"><i class="bi bi-person"></i> Profile</Nav.Link>
                    <Nav.Link onClick={() => { dispatch(logoutUser()); localStorage.setItem('user', '') }}><i class="bi bi-box-arrow-in-right"></i> Log Out</Nav.Link>

                  </>
              )}
              {user}
            </Nav>

            {/* <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Auth">Login</Nav.Link>
            </Nav> */}
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="warning">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />

    </>
  )
}

export default Darknavbar

