import React, { useState } from "react";
import { Foodbar } from "../../components";
import { Darknavbar } from "../../layout";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import './index.css'

const Homepage = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate()
    let items = useSelector(state => state).arr
    console.log('Redux')
    console.log(items)

    return (
        <>
            <Darknavbar />
            <Button id="basket" variant="danger" onClick={handleShow}><i class="bi bi-cart"></i></Button>
            <Foodbar />
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Smart-Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul id="cartitems">
                        {items.map(item => <li>{item}</li>)}
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