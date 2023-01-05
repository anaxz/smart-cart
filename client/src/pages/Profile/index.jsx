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

    useEffect(() => {
        fetch(`https://smart-cart-flask.onrender.com/users/${id}`)
            .then(res => res.json())
            .then(res => { setUser(Object.values(res)[0][1]); console.log(Object.values(res)[0][1]) });
        
        fetch(`https://smart-cart-flask.onrender.com/users/${id}`)
            .then(res => res.json())
            .then(res => { setUser(Object.values(res)[0][1]); console.log(Object.values(res)[0][1]) });
    },[])

    let details = [
        {
            id: 1,
            user: {
                name: 'Abdul',
                email: "abc@123.com",
                password: "abc123",
            },
            list: [
                ['eggs'],
                [' bacon'], 
                [' bread'],]
        },
    //     {
    //         id: 2,
    //         user: {
    //             name: 'John',
    //             email: "xyz@123.com",
    //             password: "xyz123",
    //         },
    //         list: [
    //             [' beans'], 
    //             [' bacon'],]
    //     },
    ];
    // const { details } = useParams();

    return (
        <>
        <Darknavbar />
            {details.map((detail, index) => {
            return (
                <div key={index}>
                    <div className="profilecontainer">
                        <h1>{user}</h1>
                        <h3>Your previous shopping items: {(index ? ', ' : '') + detail.list}</h3>
                    </div>
                </div>
            )
        })
    }
    </>
    )
}
export default Profile;
