import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { deleteItem } from '../../reducer'
import './index.css'


function CartModal(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let items = useSelector(state => state).arr

    

    function saveList() {
        let id = localStorage.getItem('user')
        console.log(id)
        console.log(items)
        let url = 'http://127.0.0.1:5000'
        fetch(`${url}/savelist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([id, items])
        }).then(response => response.json())
    }

    return (

        <>
            <Button id="basket" variant="danger" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', height: '40px', fontFamily: 'Poppins', fontSize: '18px' }} onClick={handleShow} ><i className="bi bi-cart"></i> Cart</Button>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Smart-Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul id="cartitems" style={{ display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
                        {items.map(item => <div style={{ display: 'flex', margin: '5px 0', borderBottom: '1px solid grey' }}><li style={{ marginTop: "2%", fontFamily: 'Poppins' }}>{item}</li><Button variant="danger" style={{ float: "right", marginLeft: "auto" }} onClick={() => dispatch(deleteItem(item))}><i class="bi bi-x-square"></i></Button></div>)}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        localStorage.getItem('user')
                            ?
                            <Button variant="secondary" onClick={() => saveList()}>
                                Save List
                            </Button>
                            :
                            ''
                    }

                    <Button variant="primary" onClick={() => navigate('/comparison')}>
                        Compare Prices!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CartModal;
