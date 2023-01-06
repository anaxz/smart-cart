import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
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
            <Button id="basket" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', height: '40px', fontFamily: 'Poppins', fontSize: '18px', margin: 'none', backgroundColor: '#EB6440', border: 'none' }} onClick={handleShow} ><i className="bi bi-cart"></i> Cart</Button>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header style={{ justifyContent: 'center', backgroundColor: '#2C74B3' }}>
                    <Modal.Title style={{ fontFamily: 'Poppins', color: 'white' }}>Your Smart-Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul id="cartitems" style={{ display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
                        {items.map(item => <div style={{ display: 'flex', margin: '5px 0', borderBottom: '3px solid #2C74B3' }}><li style={{ marginTop: "2%", fontFamily: 'Jost', fontSize: '20px' }}>{item}</li><OverlayTrigger placement="left" overlay={
                            <Tooltip>
                                Remove from cart
                            </Tooltip>
                        }><Button style={{ float: "right", marginLeft: "auto", marginBottom: '5px', backgroundColor: '#f46453', border: 'none' }} onClick={() => dispatch(deleteItem(item))}><i class="bi bi-x-square"></i></Button></OverlayTrigger></div>)}
                    </ul>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'center', fontFamily: 'Poppins', backgroundColor: '#2C74B3' }}>
                    <Button onClick={handleClose} style={{ border: 'none', backgroundColor: 'grey' }}>
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

                    <Button style={{ backgroundColor: '#EB6440', border: 'none' }} onClick={() => navigate('/comparison')}>
                        Compare Prices!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CartModal;
