import React, { useState } from "react";
import { Foodbar } from "../../components";
import { Darknavbar } from "../../layout";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { deleteItem } from '../../reducer'

import './index.css'

const Homepage = (props) => {

    const [show, setShow] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchItem, setSearchItem] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let items = useSelector(state => state).arr
    console.log('Redux')
    console.log(items)

    return (
        <>
            <Darknavbar />
            <Button id="basket" variant="danger" onClick={handleShow} style={{ position: 'absolute', right: '230px', top: '112px', height: '56px' }}><i className="bi bi-cart"></i> Cart</Button>
            <Foodbar />
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Smart-Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul style={{display:"flex", flexDirection:"column"}} id="cartitems">
                        {items.map(item => <div style={{width:"100%", marginBottom:"1%"}}><li>{item}<Button variant="danger" style={{float:"right"}} onClick={() => dispatch(deleteItem(item))}>Remove</Button></li></div>)}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => navigate('/comparison')}>
                        Compare Prices!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}



export default Homepage;
