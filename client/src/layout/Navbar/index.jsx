import React from 'react'
// import { profile, about } from './pages'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import About from '../../pages/About';

function Darknavbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Smart-Cart</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/Auth">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      </>
  )
}

export default Darknavbar

