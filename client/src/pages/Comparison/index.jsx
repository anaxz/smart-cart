import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from '../../reducer'
import { Darknavbar } from "../../layout";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const Comparison = () => {

    let items = ['Bread', 'Bread', 'Milk']

    const [topPrices, setTopPrices] = useState([])
    const [data, setData] = useState([])
    const [received, setReceived] = useState(false)

    // const dispatch = useDispatch()
    items = useSelector(state => state).arr
    console.log('Redux')
    console.log(items.arr)

    useEffect(() => {

        async function top_shop() {
            fetch("https://smart-cart-flask.onrender.com/top", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "shopping": items,
                    })
            }).then(res => res.json()).then(res => setTopPrices(res));
        }


        async function getIP() {
            let ip = ''

            return fetch("http://ip-api.com/json/")
                .then(res => res.json())
                .then(res => { console.log(res.query); ip = res.query; return ip });

        }

        async function nearby() {
            const ip = await getIP()
            console.log(ip)
            fetch("https://smart-cart-flask.onrender.com/nearby", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "shopping": items,
                        "ip": ip
                    })
            })
                .then(res => res.json())
                .then(res => { setData(res); console.log(res); setReceived(true); top_shop() })
                .catch(err => console.log(err));
        }
        nearby()
    }, [received])



    // function comparison(supermarket) {
    //     fetch("http://127.0.0.1:5000/price", {
    //         method: "POST",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(
    //             {
    //                 "shopping": items,
    //                 "supermarket": supermarket
    //             })
    //     }).then(res => res.json()).then(res => console.log(res.total));
    // }

    // function topSupermarkets() {
    //     let results = []

    //     fetch("http://127.0.0.1:5000/top", {
    //         method: "POST",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(
    //             {
    //                 "shopping": items,
    //             })
    //     })
    //         .then(res => res.json())
    //         .then(res => results = res);

    //     console.log(results)
    //     return results
    // }

    return (
        <>
            <Darknavbar />
            <h1>Comparison Page</h1>
            <CardGroup style={{ height: '400px', width: '70%', margin: '30px auto' }}>
                <Card>
                    <h2 style={{ textAlign: 'center' }}>Shopping List</h2>
                    {items.map(item => <p>{item}</p>)}
                    {console.log(data)}
                </Card>
                <Card>
                    <Tabs defaultActiveKey={1}
                        id="uncontrolled-tab-example"
                        className="mb-3 justify-content-center"
                        variant="pills"
                        style={{ width: '100%', marginTop: '20px' }}
                    >
                        <Tab eventKey={1} title="Nearby Supermarkets">
                            <h5 style={{ textAlign: 'center' }}>The nearest supermarkets to your location and their average prices</h5>
                            {data.total && data.total.map(obj => <p>{obj.supermarket} - {obj.total}</p>)}
                        </Tab>
                        <Tab eventKey={2} title="Top Supermarkets">
                            <h5 style={{ textAlign: 'center' }}>The average price of your total bill in the most popular supermarkets </h5>
                            {topPrices.map((obj, i) => <p key={i}>{obj.supermarket} - {obj.total}</p>)}
                        </Tab>
                    </Tabs>
                </Card>
            </CardGroup>
        </>
    )
}

export default Comparison;