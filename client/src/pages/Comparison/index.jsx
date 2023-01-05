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
import './index.css'

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
            fetch("http://127.0.0.1:5000/top", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "shopping": items,
                    })
            }).then(res => res.json()).then(res => setTopPrices(res));
        }


        async function getIP() {
            return fetch("https://api.ipify.org/?format=json")
                .then(res => res.json())
                .then(res => res.ip);

        }

        async function nearby() {
            const ip = await getIP()
            console.log(ip)
            fetch("http://127.0.0.1:5000/nearby", {
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

    const logos = {
        'Tesco': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Tesco_Logo.svg/2560px-Tesco_Logo.svg.png',
        'Sainsburys': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Sainsbury%27s_Logo.svg/2560px-Sainsbury%27s_Logo.svg.png',
        'Aldi': 'https://logos-world.net/wp-content/uploads/2022/01/Aldi-Logo-2006.png',
        'Asda': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Asda_logo.svg/1280px-Asda_logo.svg.png',
        'MnS': 'https://corporate.marksandspencer.com/sites/marksandspencer/files/styles/desktop/public/marksandspencer/logos/m-s-logo.png?itok=dWh-QxpV',
        'Iceland': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Iceland_Foods_logo.svg/2560px-Iceland_Foods_logo.svg.png',
        'Morrisons': 'https://logos-download.com/wp-content/uploads/2016/05/Morrisons_logo_logotype.png',
        'Waitrose': 'https://logos-world.net/wp-content/uploads/2021/03/Waitrose-Logo-2004-2018.png'
    }

    return (
        <>
            <Darknavbar />
            <h3 style={{color:"white", textAlign: 'center' }}>Comparison Page</h3>
            <CardGroup style={{ height: '400px', width: '70%', margin: '30px auto' }}>
                <Card>
                    <h4 style={{ textAlign: 'center', marginTop: '20px' }}>Shopping List</h4>
                    <div style={{ position: 'relative', width: '50%', borderRadius: '10px', backgroundColor: '#205295', margin: '20px auto', padding: '20px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>{items.map(item => <p style={{color:"white"}}>{item}</p>)}</div>
                    {console.log(data)}
                </Card>
                <Card>
                    <Tabs defaultActiveKey={1}
                        id="comparison"
                        className="mb-3 justify-content-center"
                        variant="pills"
                        style={{ width: '80%', margin: '20px auto 0', backgroundColor: '#c4dbfd', padding: '10px 0', borderRadius: '10px' }}
                    >
                        <Tab eventKey={1} title="Nearby Supermarkets">
                            <h5 style={{ textAlign: 'center' }}>The nearest supermarkets to your location and their average prices</h5>
                            {data.total && data.total.map(obj => <><img style={{ width: '100px' }} src={logos[obj.supermarket]} alt="" /><p>{obj.total}</p></>)}
                        </Tab>
                        <Tab eventKey={2} title="Top Supermarkets">
                            <h5 style={{ textAlign: 'center' }}>The average price of your total bill in the most popular supermarkets </h5>
                            {topPrices.map((obj, i) => <><img style={{ width: '100px' }} src={logos[obj.supermarket]} alt="" /><p>{obj.total}</p></>)}
                        </Tab>
                    </Tabs>
                </Card>
            </CardGroup>
        </>
    )
}

export default Comparison;
