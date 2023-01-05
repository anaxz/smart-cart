import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';

// import { profile, about } from './pages'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser, findItem } from '../../reducer'
import './index.css'
import { CartModal } from '../../components'



// import About from '../../pages/About';


function Darknavbar({ }) {
  // const auth= localStorage.getitem("user")
  // const navigate = useNavigate()
  // const logout=()=>{
  //   localStorage.clear();
  //   navigate("/Auth")

  const dispatch = useDispatch()
  const items = useSelector(state => state)
  let user = localStorage.getItem('user')

  const [searchItem, setSearchItem] = useState('')
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault()

    const val = searchItem.charAt(0).toUpperCase() + searchItem.slice(1);
    setSearchItem(val)

    if (searchItem !== '') {
      const itemData = handleSearch(searchItem)

      if (itemData !== undefined) {
        // dispatch(findItem(searchItem));
        setSearchItem('')
        navigate('/search-results')
      }
    }
  }

  async function handleSearch(item) {
    const result = await getProduct(item)
    let itemData = Object.values(result)
    dispatch(findItem(itemData[0][0]))
    return itemData[0][0]
  }

  async function getProduct(name) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = 'http://127.0.0.1:5000'
        const resp = await fetch(`${url}/products/${name}`)
          .then(response => response.json())
        resolve(resp)
      } catch (err) {
        return err
      }
    })
  }

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="primary" variant="dark" style={{ backgroundColor: '#144272', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
        <Container>
          <Navbar.Brand href="#home" style={{ fontFamily: 'Manrope' }}><i className="bi bi-cart-check"></i> Smart-Cart</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">


            <Nav className="me-auto">
              <Nav.Link style={{ color: 'white' }} onClick={() => navigate('/home')}><i class="bi bi-house"></i> Home</Nav.Link>
              <Nav.Link style={{ color: 'white' }} onClick={() => navigate('/about')}><i class="bi bi-question-circle"></i> About</Nav.Link>
              {!user ? (
                <Nav.Link style={{ color: 'white' }} onClick={() => navigate('/Auth')}><i class="bi bi-box-arrow-in-right"></i> Login</Nav.Link>
              ) : (
                <>
                  <Nav.Link style={{ color: 'white' }} onClick={() => navigate('/profile')}><i class="bi bi-person"></i> Profile</Nav.Link>
                  <Nav.Link style={{ color: 'white' }} onClick={() => { dispatch(logoutUser()); localStorage.setItem('user', '') }}><i class="bi bi-box-arrow-in-right"></i> Log Out</Nav.Link>

                </>
              )}
              <CartModal />
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
                style={{ width: '200px', background: 'transparent', border: 'none', borderBottom: '1px solid #C4DBFD', borderRadius: '0', color: 'white' }}
                onChange={(e) => setSearchItem(e.target.value)} value={searchItem}
              />
              <button style={{ backgroundColor: '#C4DBFD', color: '#444f46', fontFamily: 'Poppins', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', border: 'none', width: '50px' }} onClick={handleSubmit} ><i class="bi bi-search"></i></button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />

    </>
  )
}

export default Darknavbar

