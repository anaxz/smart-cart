import React from "react";
import { Darknavbar } from "../../layout";
import './index.css';


const Profile = () => {
    let details = [
        {
            id: 1,
            user: {
                name: 'Abdul',
                email: "abc@123.com",
                password: "abc123",
            },
            list: ['eggs', 'bacon', 'bread'],
        },
        {
            id: 2,
            user: {
                name: 'John',
                email: "xyz@123.com",
                password: "xyz123",
            },
            list: ['beans', 'bacon'],
        },
    ];
    // const { details } = useParams();

    return (
        <>
        <Darknavbar />
            {details.map(detail => {
            return (
                <div key={detail.id}>
                    <div className="profilecontainer">
                        <h1>Profile Page: {detail.user.name}</h1>
                        <h3>Your favourite items: {detail.favourites}</h3>
                        <h3>Previous shopping lists:</h3>
                    </div>
                </div>
            )
        })
    }
    </>
    )
}
export default Profile;
