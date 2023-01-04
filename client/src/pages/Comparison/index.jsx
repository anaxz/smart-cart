import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from '../../reducer'

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
            let ip = ''

            return fetch("http://ip-api.com/json/")
                .then(res => res.json())
                .then(res => { console.log(res.query); ip = res.query; return ip });
            
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

    return (
        <>
            <h1>Comparison Page</h1>
            <h2>Shopping List</h2>
            {items.map(item => <p>{item}</p>)}
            {console.log(data)}
            <h2>Nearby Supermarkets</h2>
            {data.total && data.total.map(obj => <p>{obj.supermarket} - {obj.total}</p>)}
            <h2>Top Supermarkets</h2>
            {topPrices.map((obj, i) => <p key={i}>{obj.supermarket} - {obj.total}</p>) }
        </>
    )
}

export default Comparison;