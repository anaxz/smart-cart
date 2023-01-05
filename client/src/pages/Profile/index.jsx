import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Darknavbar } from "../../layout";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './index.css';


const Profile = () => {
    const navigate = useNavigate()

    if (!localStorage.getItem('user')) navigate('/home') 

    const id = localStorage.getItem('user')
    const [content, setContent] = useState([])
    const [user, setUser] = useState([])
    const [lists, setLists] = useState([])
    const [items, setItems] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {

        function getProducts() {
            fetch(`http://127.0.0.1:5000/products`)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    setProducts(res)
                    // setLists(Object.values(res))
                });
        }

        function all_lists() {
            fetch(`http://127.0.0.1:5000/users/${id}/all-shoplist`)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    setLists(Object.values(res));
                    getProducts()
                });
        }

        fetch(`http://127.0.0.1:5000/users/${id}`)
            .then(res => res.json())
            .then(res => {
                setUser(Object.values(res)[0][1]);
                console.log(Object.values(res)[0][1]);
                all_lists()
            });
        
        
        
    },[lists.length, products.length, items.length])

    function showList(data) {
        console.log(data)
        setItems(data)
    }

    return (
        <>
        <Darknavbar />
   
        <div className="profilecontainer">
            <h1>Hello {user}!</h1>
            <h4>Here are you saved shopping lists:</h4>
            {
                lists.length > 0
                &&
                lists[0].map((obj, i) => {
                    // console.log(obj[1]);
                    { return <button onClick={() => showList(obj)}>List {i+1}</button> }
                })
                }
                
                <div>
                     
                    {
                        
                        items.map(obj => {
                        let a = products.filter(x => x[0] == obj)[0][1];
                        console.log(a)
                            return <li>{a}</li>
                    }

                    )}
                </div>
            </div>
            
            <ListModal content={'' } />
            
    
    </>
    )
}
export default Profile;


function ListModal({content}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (

        <>
            {/* <Button id="basket" variant="danger" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', height: '40px', fontFamily: 'Poppins', fontSize: '18px' }} onClick={handleShow} ><i className="bi bi-cart"></i> Cart</Button> */}
            <Modal  aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#c4dbfd' }}>
                    <Modal.Title>Your List</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#c4dbfd' }}>
                    <ul id="cartitems" style={{ display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
                        {/* {items.map(item => <div style={{ display: 'flex', margin: '5px 0', borderBottom: '1px solid grey' }}><li style={{ marginTop: "2%", fontFamily: 'Poppins' }}>{item}</li><Button variant="danger" style={{ float: "right", marginLeft: "auto" }} onClick={() => dispatch(deleteItem(item))}><i class="bi bi-x-square"></i></Button></div>)} */}
                    </ul>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#c4dbfd' }}>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}