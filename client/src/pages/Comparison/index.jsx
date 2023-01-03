import React from "react";
import { useEffect, useState } from "react";

const Comparison = () => {

    let items = ['Bread', 'Milk', 'Onion']

    const [nearby, setNearby] = useState([])


    useEffect(() => {
        // fetch('https://jsonip.com/')
        //     .then(resp => resp.json())
        //     .then(res => setNearby(comparison(res.ip)['total']))
        topSupermarkets()
    },[])

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
        let supermarkets = ['Tesco', 'Waitrose']
        let results = []

        for (let i = 0; i < supermarkets.length; i++) {
            console.log(supermarkets[i])
            fetch("http://127.0.0.1:5000/price", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "shopping": items,
                        "supermarket": supermarkets[i]
                    })
            })
                .then(res => res.json())
                .then(res => { console.log(res); results.push(res); console.log(results) });
        }
        console.log(results)
        return results
    }

    return (
        <>
            <h1>Comparison Page</h1>
            <button onClick={() => comparison('Tesco')}>Tesco</button>
            <button onClick={() => comparison('Sainsburys')}>Sainsbury's</button>
            <button onClick={() => comparison('Waitrose')}>Waitrose</button>
            {nearby.map(obj => console.log(obj)) }
        </>
    )
}

export default Comparison;