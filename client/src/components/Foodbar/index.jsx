import React from 'react';
import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Itemcard from '../Itemcard';
import ShowItems from '../ShowItems';
import './index.css'


function Foodbar() {

    const [showItems, setShowItems] = useState([]);
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        async function getItemData() {
            const url = 'http://127.0.0.1:5000/products'
            // const response = url.get()
            fetch('http://127.0.0.1:5000/products')
                .then(resp => resp.json())
                .then(result => setProductData(result))
        }
        getItemData()
    }, [])


    return (
        <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            fill
            variant='pills'
        >
            <Tab eventKey="bakery" title="Bakery">
                <ShowItems data={productData} category={'Bakery'} />
            </Tab>
            <Tab eventKey="dairy" title="Dairy">
                <ShowItems data={productData} category={'Dairy'} />
            </Tab>
            <Tab eventKey="meat" title="Meat">
                <ShowItems data={productData} category={'Meat'} />
            </Tab>
            <Tab eventKey="fruit_and_veg" title="Fruit & Veg">
                <ShowItems data={productData} category={'Fruit_Veg'} />
            </Tab>
            <Tab eventKey="household" title="Household">
                <ShowItems data={productData} category={'Household'} />
            </Tab>
            <Tab eventKey="toiletries" title="Toiletries">
                <ShowItems data={productData} category={'Toiletries'} />
            </Tab>
            <Tab eventKey="drinks" title="Drinks">
                <ShowItems data={productData} category={'Drinks'} />
            </Tab>
            <Tab eventKey="other" title="Other">
                <ShowItems data={productData} category={'Other'} />
            </Tab>

        </Tabs>
    );
}

export default Foodbar;