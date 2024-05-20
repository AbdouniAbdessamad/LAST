import React, { useState } from "react";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router-dom";

export default function Supplier() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    setErrors(null); // Reset errors before making the request
    console.log("Submitting form with values:", { name, city, address, country, phone });

    axiosClient
      .post("/suppliers", {
        name,
        city,
        address,
        country,
        phone,
      })
      .then(() => {
        console.log("Form submitted successfully");
        setLoading(false);
        navigate("/suppliers");
      })
      .catch((err) => {
        console.error("Error submitting form", err);
        setLoading(false);
        const response = err.response;
        if (response) {
          console.log("Error response received:", response);
          if (response.status === 422) {
            setErrors(response.data.errors);
            console.log("Validation errors:", response.data.errors);
          } else {
            setErrors({ general: "An error occurred. Please try again later." });
          }
        } else {
          setErrors({ general: "An error occurred. Please try again later." });
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
          <button className="btn" type="submit" disabled={loading}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
