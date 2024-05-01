import React, { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router-dom";

export default function NewArticle() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  // State for each input field
  const [date, setDate] = useState("");
  const [bonCommande, setBonCommande] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [ref, setRef] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    getCategory();
    getSuppliers();
  }, []);

  const getCategory = () => {
    setLoading(true);
    axiosClient
      .get("/categories")
      .then(({ data }) => {
        setLoading(false);
        if (data.categories) {
          setCategory(data.categories);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getSuppliers = () => {
    setLoading(true);
    axiosClient
      .get("/suppliers")
      .then(({ data }) => {
        if (data?.data) {
          setSuppliers(data.data);
          setError(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
        setError("Error fetching suppliers. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const article = {
      date,
      bon_commande: bonCommande,
      supplier_id: supplierId,
      ref,
      name,
      quantity,
      status,
      category_id: categoryId,
    };
    axiosClient
      .post("/articles", article)
      .then(() => {
        setLoading(false);
        navigate("/articles");
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
      <h1>New Article</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
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
            <label>Date:</label>
            <input
            name="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Bon de commande:</label>
            <input
            name="bon_commande"
              type="text"
              value={bonCommande}
              onChange={(e) => setBonCommande(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Fournisseur:</label>
            <br />
            <select
                name="supplier_id"
              style={{ width: "100%", height: "50px" }}
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
            >
              <option value=""></option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Reference:</label>
            <input
            name="ref"
              type="text"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Designation:</label>
            <input
            name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Quantité:</label>
            <input
            name="quantity"
              min={1}
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <br />
            <select
            name="status"
              style={{ width: "100%", height: "50px" }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value=""></option>
              <option value="entree">entrée</option>
              <option value="sortie">sortie</option>
            </select>
          </div>
          <div className="form-group">
            <label>Categorie:</label>
            <br />
            <select
            name="category_id"
              style={{ width: "100%", height: "50px" }}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {category.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
