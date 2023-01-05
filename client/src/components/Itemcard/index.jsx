import React, { useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../reducer'
import useTimeout from '../../customHooks/useTimeout'
import './index.css';

function Itemcard({ data, fav }) {

    const [show, setShow] = useState(false);
    const target = useRef(null);


    console.log('show: ' + show)
    // if(show) useTimeout(() => setShow(false), 2000) 

    const dispatch = useDispatch()
    const items = useSelector(state => state)

    // function addToCart(name) {
    //     let arr = []
    //     arr = shopping
    //     arr.push(name)
    //     setShopping(arr)
    //     console.log(shopping)
    // }

    function handleAddToCart(e) {
        e.preventDefault()
        dispatch(addItem(data[1]))
        setShow(prev => !prev)
        // if(show) useTimeout(() => setShow(false), 1000) 
    }

    function favourite(item) {
        const id = localStorage.getItem('user')
        console.log(id)
        console.log('Fav', item)
        fetch(`http://127.0.0.1:5000/users/${id}/favs`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([item, true])
        }).then(res => res.json()).then(res => console.log(res));
    }

    function unfavourite(item) {
        const id = localStorage.getItem('user')
        console.log(id)
        console.log('Fav', item)
        fetch(`http://127.0.0.1:5000/users/${id}/favs`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([item, false])
        }).then(res => res.json()).then(res => console.log(res));
    }

    return (
        <CardGroup>
            <Card id="item" style={{
                width: '18rem',
                height: '170px',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
            }}
                border="primary">
                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Card.Title style={{ borderBottom: '1px solid blue', paddingBottom: '10px', fontFamily: 'Poppins', fontSize: '16px' }} className="text-center">{data[1]}</Card.Title>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button variant="primary" ref={target} onClick={handleAddToCart}><i className="bi bi-cart-plus"></i></Button>
                        {localStorage.getItem('user') ? fav.find(obj => obj[1] == data[1]) ? <Button variant="warning" onClick={() => { unfavourite(data[1]); }}><i class="bi bi-star-fill"></i></Button> : <Button variant="warning" onClick={() => { favourite(data[1]); }}><i class="bi bi-star"></i></Button> : ''}
                    </div>

                    <Overlay target={target.current} show={show} placement="right" >
                        {(props) => (
                            <Tooltip id="overlay-example" {...props}>
                                Added to cart!
                            </Tooltip>

                        )}
                    </Overlay>
                </Card.Body>
            </Card>
        </CardGroup>
    );
}

export default Itemcard;
