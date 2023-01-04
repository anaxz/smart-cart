import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Itemcard from '../Itemcard';
import ShowItems from '../ShowItems';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './index.css'


function Foodbar() {

    const [showItems, setShowItems] = useState([]);
    const [fav, setFavs] = useState([]);
    const [productData, setProductData] = useState([]);
    const [shopping, setShopping] = useState([]);
    const navigate = useNavigate()
    const user = localStorage.getItem('user')

    useEffect(() => {

        async function getFavourites() {
            fetch(`http://127.0.0.1:5000/users/${user}/favs`)
                .then(res => res.json())
                .then(res => { setFavs(Object.values(res)[0]); console.log('test'); console.log(Object.values(res))});
        }

        async function getItemData() {
            const url = 'http://127.0.0.1:5000/products'
            // const response = url.get()
            fetch('http://127.0.0.1:5000/products')
                .then(resp => resp.json())
                .then(result => { setProductData(result); getFavourites() })
        }

        

        getItemData()
    }, [fav.length])

    fav.map(obj => console.log(obj))

    return (
        <div style={{
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem 5px',
            borderRadius: '10px',
            width: '70%',
            backgroundColor: 'lightblue'
        }}>
            <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className="m-3 px-4 py-2"
                fill
                variant='pills'
                style={{ backgroundColor: 'lightyellow', borderRadius: '10px' }}
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

                {
                
                    user
                        ?
                        <Tab eventKey="favourites" title="Favourites">
                            <Row className="justify-content-center">
                                {
                                    fav
                                        // .filter(product => product[1] == 'Other')
                                        .map(product => (<Col xs={2} className="mx-3 my-3 justify-content-center"><Itemcard shopping={shopping} setShopping={setShopping} data={product} /></Col>))
                                }
                            </Row>
                        </Tab>
                        :
                        ''
                }
                
                
            </Tabs>

        </div>
    );
}

export default Foodbar;