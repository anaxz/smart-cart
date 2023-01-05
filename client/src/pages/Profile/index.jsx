import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Darknavbar } from "../../layout";
import './index.css';


const Profile = () => {
    const navigate = useNavigate()

    if (!localStorage.getItem('user')) navigate('/home') 

    const id = localStorage.getItem('user')
    const [user, setUser] = useState([])
    const [lists, setLists] = useState([])
    const [items, setItems] = useState([])

    useEffect(() => {

        function getProducts() {
            
        }

        function all_lists() {
            fetch(`http://127.0.0.1:5000/users/${id}/all-shoplist`)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    
                    setLists(Object.values(res))
                });
        }

        fetch(`http://127.0.0.1:5000/users/${id}`)
            .then(res => res.json())
            .then(res => { setUser(Object.values(res)[0][1]); console.log(Object.values(res)[0][1]);  all_lists()});
        
        
        
    },[lists.length])

    function showList(data) {
        console.log(data)
        setItems(data)
    }

    return (
        <>
        <Darknavbar />
   
        <div className="profilecontainer">
            <h1>Hello {user}!</h1>
            <h3>Saved Shopping Lists:</h3>
            {
                lists.length > 0
                &&
                lists[0].map((obj, i) => {
                    // console.log(obj[1]);
                    { return <button onClick={() => showList(obj)}>List {i+1}</button> }
                })
                }
                
                <div>
                    {items.map(obj => <p>{obj}</p>)}
                </div>
        </div>
            
    
    </>
    )
}
export default Profile;
