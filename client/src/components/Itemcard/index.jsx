import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../reducer'
import './index.css';
import { useState } from "react";

function Itemcard({ data, fav }) {

    const [active, setActive] = useState(false)

    useEffect(() => {
        displayButton()
    },[active, fav.length])




    // if(show) useTimeout(() => setShow(false), 2000) 

    const dispatch = useDispatch()
    const items = useSelector(state => state)


    function handleAddToCart(e) {
        e.preventDefault()
        dispatch(addItem(data[1]))
        setShow(prev => !prev)
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

    function displayButton() {
        return fav.find(obj => obj[1] == data[1])
            ? setActive(true)
            : setActive(false)
    }

    return (
        <CardGroup data-testid="card-group">
            <Card id="item" style={{
                width: '18rem',
                height: '170px',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                borderRadius: '10px'
            }}>
                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Card.Title style={{ borderBottom: '1px solid blue', paddingBottom: '10px', fontFamily: 'Poppins', fontSize: '16px', color: 'black' }} className="text-center">{data[1]}</Card.Title>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <OverlayTrigger placement="top" overlay={
                            <Tooltip>
                                Add to cart
                            </Tooltip>
                        }>
                            <Button onClick={handleAddToCart} style={{ backgroundColor: '#EB6440', border: 'none' }}><i className="bi bi-cart-plus"></i></Button>
                        </OverlayTrigger>
                        {/* {localStorage.getItem('user') ? fav.find(obj => obj[1] == data[1])
                            ? <Button variant="warning" onClick={() => { unfavourite(data[1]); }}><i class="bi bi-star-fill"></i></Button> 
                            : <Button variant="warning" onClick={() => { favourite(data[1]); }}><i class="bi bi-star"></i></Button> : ''} */}
                        {
                            localStorage.getItem('user')
                                ? active
                                    ? <Button variant="warning" onClick={() => { unfavourite(data[1]); }}><i class="bi bi-star-fill"></i></Button>
                                    : <Button variant="warning" onClick={() => { favourite(data[1]); }}><i class="bi bi-star"></i></Button>
                            : ''
                            }
                    </div>


                </Card.Body>
            </Card>
        </CardGroup>
    );
}

export default Itemcard;
