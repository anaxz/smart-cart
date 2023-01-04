import React from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './index.css';

function Itemcard({ shopping, setShopping, data }) {
    console.log('Item card')
    console.log(data)

    function addToCart(name) {
        let arr = []
        arr = shopping
        arr.push(name)
        setShopping(arr)
        console.log(shopping)
    }

    return (

        <Card id="cardbody" style={{ width: '18rem' }} border="primary">
            <Card.Body>
                <Card.Title>{data[1]}</Card.Title>
                <Button variant="primary" onClick={() => addToCart(data[1])}><i class="bi bi-cart-plus"></i></Button>
            </Card.Body>
        </Card>

    );
}

export default Itemcard;