import React from "react";
import { useEffect, useState } from "react";

const Comparison = () => {

    let items = ['Bread', 'Milk', 'Onion']

    const [topPrices, setTopPrices] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/top", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "shopping": items,
                })
        }).then(res => res.json()).then(res => setTopPrices(res));
        function nearby() {
            let ip = ''

            fetch("http://ip-api.com/json/").then(res => res.json()).then(res => ip = res.query);

            fetch("http://127.0.0.1:5000/nearby", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "shopping": items,
                        "ip": ip
                    })
            }).then(res => res.json()).then(res => setData(res));
        }
    nearby()
    }, [data])
    
    

    function comparison(supermarket) {
        fetch("http://127.0.0.1:5000/price", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "shopping": items,
                    "supermarket": supermarket
                })
        }).then(res => res.json()).then(res => console.log(res.total));
    }

    function topSupermarkets() {
        let results = []

        fetch("http://127.0.0.1:5000/top", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "shopping": items,
                })
        })
            .then(res => res.json())
            .then(res => results = res);
        
        console.log(results)
        return results
    }

    return (
        <>
            <h1>Comparison Page</h1>
            {...items}
            {data.map(obj => <p>{obj}</p>)}
            <p >Tesco - {comparison('Tesco') }</p>
            <p onClick={() => comparison('Sainsburys')}>Sainsbury's</p>
            <p onClick={() => comparison('Waitrose')}>Waitrose</p>
            <h2>Top Supermarkets</h2>
            {topPrices.map((obj, i) => <p key={i}>{obj.supermarket} - {obj.total}</p>) }
        </>
    )
}

export default Comparison;