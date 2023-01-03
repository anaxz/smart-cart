import React from 'react'
// import { profile, about } from './pages'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
// import About from '../../pages/About';

function Darknavbar() {
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><i class="bi bi-cart2"></i> Smart-Cart</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/"><i class="bi bi-house"></i> Home</Nav.Link>
              <Nav.Link href="/profile"><i class="bi bi-person"></i> Profile</Nav.Link>
              <Nav.Link href="/about"><i class="bi bi-question-circle"></i> About</Nav.Link>
              <Nav.Link href="/Auth"><i class="bi bi-box-arrow-in-right"></i> Login</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  )
}

export default Darknavbar

