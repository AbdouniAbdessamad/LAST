import React, { useState } from "react";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router-dom";
export default function Supplier({ onAdd }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const supplier = { name, city, address, country, phone };
    axiosClient
      .post("/suppliers", supplier)
      .then(() => {
        setErrors(null); // Clear errors on successful submissions
        navigate("/suppliers");
      })
      .catch((err) => {
        setLoading(false);
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div>
      <h1>New Supplier</h1>
      {loading && <p>Loading...</p>}
      {errors && (
        <div className="alert">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}
      <div className="card animated fadeInDown">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Country:</label>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <button className="btn" type="submit"> Save </button>
        </form>
      </div>
    </div>
  );
}
