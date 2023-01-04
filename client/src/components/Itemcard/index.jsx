import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../reducer'
import './index.css';

function Itemcard({ shopping, setShopping, data }) {
    // console.log('Item card')
    // console.log(data)

    function addToCart(name) {
        let arr = []
        arr = shopping
        arr.push(name)
        setShopping(arr)
        console.log(shopping)



    }

    function favourite(item) {
        console.log(item)
    }

    const dispatch = useDispatch()
    const items = useSelector(state => state)
    // console.log('Redux')
    // console.log(items)

    return (
        <CardGroup>
            <Card style={{ width: '18rem' }} border="primary">
                <Card.Body>
                    <Card.Title>{data[1]}</Card.Title>
                    <Button variant="primary" onClick={() => { dispatch(addItem(data[1])) }}><i className="bi bi-cart-plus"></i></Button>
<<<<<<< HEAD
                    {localStorage.getItem('user') && <Button variant="primary" onClick={() => { console.log(data[1]);}}><i class="bi bi-star"></i></Button>}
=======
                    {localStorage.getItem('user') && <Button variant="primary" onClick={() => { console.log(data[1]); }}><i class="bi bi-star"></i></Button>}
                    <Button variant="primary" onClick={() => { console.log(localStorage.getItem('name')) }}>Get</Button>
>>>>>>> 4b569f50619ee20f848462d6cbbdbcaf0e89b98a
                </Card.Body>
            </Card>
        </CardGroup>
    );
}

export default Itemcard;
