import React, { useState } from 'react'
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

  const [searchItem, setSearchItem] = useState()

  function handleSubmit(e){
    e.preventDefault()

    const val = searchItem.charAt(0).toUpperCase() + searchItem.slice(1);
    setSearchItem(val)

    console.log('search clicked')
    console.log(searchItem)

    if(searchItem !== null) {
      handleSearch()
      // setSearchItem(null)
    }
    
  }
  // after btn click, goto another page display the product and category

  async function handleSearch(){
    const result = await getProduct(searchItem)
    
    console.log(Object.values(result) )
  }

  async function getProduct(name) {
    return new Promise(async (resolve, reject) => {
      try {
        // const val = name.charAt(0).toUpperCase() + name.slice(1);
        // console.log(val)

        const url = 'http://127.0.0.1:5000'
        const resp = await fetch(`${url}/products/${name}`)
          .then(response => response.json() )
        console.log(resp)
        resolve(resp)
      } catch(err){
          console.log(err)
          return err
      }
    })
}

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="primary" variant="dark" className="mx-5">
        <Container>
          <Navbar.Brand href="#home"><i className="bi bi-cart-check"></i> Smart-Cart</Navbar.Brand>
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
                onChange={(e) => setSearchItem(e.target.value)} value={searchItem} 
              />
              <Button variant="warning" onClick={handleSubmit} >Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />

    </>
  )
}

export default Darknavbar

