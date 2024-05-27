import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";

export default function EditProfile() {
    const [user, setUser] = useState({});

    useEffect(() => {
        getProfileInfo();
    }, []);

    const getProfileInfo = () => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
            })
            .catch(err => {
                console.error("Error fetching user data", err);
            });
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <fieldset>
            <h1>Nom: {user.name}</h1>
            <br />
            <h1>Email: {user.email}</h1>
            <br />
            <Link style={{display: 'flex', justifyContent: 'center', alignItems: 'center',textDecoration:"none",fontSize:"20px",color:"black",backgroundColor:"#5b08a7",borderRadius:"5px",height:"30px"}} to="/editP">Edit profile</Link>
            </fieldset>

        </div>
    );
}
