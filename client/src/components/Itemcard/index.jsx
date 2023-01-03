import React from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './index.css';

function Itemcard({ data }) {
    console.log('Item card')
    console.log(data)

    let items = []

    function addToCart(name) {
        items.push(name)
        console.log(name)
    }

    return (
        <CardGroup>
            <Card style={{ width: '18rem' }} border="primary">
                <Card.Body>
                    <Card.Title>{data[1]}</Card.Title>
                    <Button variant="primary" onClick={() => addToCart(data[1])}><i class="bi bi-cart-plus"></i></Button>
                </Card.Body>
            </Card>
        </CardGroup>
    );
}

export default Itemcard;