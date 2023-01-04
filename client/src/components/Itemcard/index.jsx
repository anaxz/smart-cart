import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../reducer'
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

    const dispatch = useDispatch()
    const items = useSelector(state => state)
    console.log('Redux')
    console.log(items)

    return (
        <CardGroup>
            <Card style={{ width: '18rem' }} border="primary">
                <Card.Body>
                    <Card.Title>{data[1]}</Card.Title>
                    <Button variant="primary" onClick={() => { addToCart(data[1]); dispatch(addItem(data[1])) }}><i className="bi bi-cart-plus"></i></Button>
                </Card.Body>
            </Card>
        </CardGroup>
    );
}

export default Itemcard;
