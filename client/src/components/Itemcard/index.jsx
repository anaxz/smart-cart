import React from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './index.css';

function Itemcard({ data }) {
    console.log('Item card')
    console.log(data)
    return (
        <CardGroup>
            <Card style={{ width: '18rem' }} border="primary">
                <Card.Body>
                    <Card.Title>{data[1]}</Card.Title>
                    <Button variant="primary"><i class="bi bi-cart-plus"></i></Button>
                </Card.Body>
            </Card>
        </CardGroup>
    );
}

export default Itemcard;