import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router-dom for navigation
import axiosClient from '../../axiosClient'; // Adjust the import based on the actual path to your axiosClient

export default function UpdateP() {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Hook from react-router-dom for navigation

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

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    navigate('/users');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient.post('/users', user)
                .then(() => {
                    navigate('/users');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    return (
        <div className="hhh">
            <form  onSubmit={onSubmit}>
            <input
            className="123"
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
            />
            <input
            className="123"
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
            />
            <input
            className="123"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
            />
            <input className="hhhh" type="submit" />
            {errors && (
                <div>
                    {Object.keys(errors).map((key) => (
                        <div key={key}>{errors[key]}</div>
                    ))}
                </div>
            )}
        </form>
        </div>

    );
}
