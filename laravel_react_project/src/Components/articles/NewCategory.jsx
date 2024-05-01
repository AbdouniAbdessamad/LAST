import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";

export default function NewCategory() {
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        name: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const onSubmit = ev => {
        ev.preventDefault();
        setLoading(true);
        axiosClient.post('/categories', category)
            .then(() => {
                navigate('/category');
            })
            .catch(err => {
                const response = err.response;
                setLoading(false);
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="card animated fadeInDown">
            <h1>New Category</h1>
            {loading && <div className="text-center">Loading...</div>}
            {errors &&
                <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }
            <form onSubmit={onSubmit}>
                <input value={category.name} onChange={ev => setCategory({ ...category, name: ev.target.value })} placeholder="Category Name" />
                <button className="btn">Save</button>
            </form>
        </div>
    );
}
