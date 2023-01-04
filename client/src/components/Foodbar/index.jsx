import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Itemcard from '../Itemcard';
import ShowItems from '../ShowItems';
import './index.css'


function Foodbar() {

    const [showItems, setShowItems] = useState([]);
    const [productData, setProductData] = useState([]);
    const [shopping, setShopping] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        async function getItemData() {
            const url = 'http://127.0.0.1:5000/products'
            // const response = url.get()
            fetch('http://127.0.0.1:5000/products')
                .then(resp => resp.json())
                .then(result => setProductData(result))
        }

        async function getFavourites() { 
            fetch("http://127.0.0.1:5000/users/2/favs", {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(2)
            }).then(res => res.json()).then(res => console.log(res));
        }

        getItemData()
        // getFavourites()
    }, [])

    return (
        <>
            <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className="m-3 px-4 py-2"
                fill
                variant='pills'
            >
                <Tab eventKey="bakery" title="Bakery">
                    <ShowItems shopping={shopping} setShopping={setShopping} data={productData} category={'Bakery'} />
                </Tab>
                <Tab eventKey="dairy" title="Dairy">
                    <ShowItems shopping={shopping} setShopping={setShopping} data={productData} category={'Dairy'} />
                </Tab>
                <Tab eventKey="meat" title="Meat">
                    <ShowItems shopping={shopping} setShopping={setShopping} data={productData} category={'Meat'} />
                </Tab>
                <Tab eventKey="fruit_and_veg" title="Fruit & Veg">
                    <ShowItems shopping={shopping} setShopping={setShopping} data={productData} category={'Fruit_Veg'} />
                </Tab>
                <Tab eventKey="household" title="Household">
                    <ShowItems shopping={shopping} setShopping={setShopping} data={productData} category={'Household'} />
                </Tab>
                <Tab eventKey="toiletries" title="Toiletries">
                    <ShowItems shopping={shopping} setShopping={setShopping} data={productData} category={'Toiletries'} />
                </Tab>
                <Tab eventKey="drinks" title="Drinks">
                    <ShowItems shopping={shopping} setShopping={setShopping} data={productData} category={'Drinks'} />
                </Tab>
                <Tab eventKey="other" title="Other">
                    <ShowItems shopping={shopping} setShopping={setShopping} data={productData} category={'Other'} />
                </Tab>
            </Tabs>
        </>
    );
}

export default Foodbar;