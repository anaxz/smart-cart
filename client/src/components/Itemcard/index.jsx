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
        const id = localStorage.getItem('user')
        console.log(id)
        console.log('Fav', item)
        // fetch(`http://127.0.0.1:5000/users/${id}/favs`, {
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(item)
        // }).then(res => res.json()).then(res => console.log(res));
    }

    const dispatch = useDispatch()
    const items = useSelector(state => state)
    // console.log('Redux')
    // console.log(items)

    return (
        <CardGroup>
            <Card style={{ width: '18rem' }} border="primary">
                <Card.Body>
                    <Card.Title className="text-center">{data[1]}</Card.Title>
                    <Button variant="primary" onClick={() => { dispatch(addItem(data[1])) }}><i className="bi bi-cart-plus"></i></Button>
                    {localStorage.getItem('user') && <Button variant="primary" onClick={() => { favourite(data[1])}}><i class="bi bi-star"></i></Button>}
                </Card.Body>
            </Card>
        </CardGroup>
    );
}

export default Itemcard;
