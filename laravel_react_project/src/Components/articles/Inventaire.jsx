import React, { useEffect, useState } from "react";
import axiosclient from "../../axiosClient";

export default function Inventaire() {
  const [inv, setInv] = useState([]);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategory();
  }, []);

  const getCategoryNameById = (categories, id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : null;
  };

  const getCategory = () => {
    setLoading(true);
    axiosclient
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
const handlePrint = () => {
  window.print();
};
  const handleSubmit = (event) => {
    event.preventDefault();

    if (new Date(date1) >= new Date(date2)) {
      setError("La date 1 doit être inférieure à la date 2.");
      return;
    }

    setError("");
    setLoading(true);

    axiosclient
      .get(`/inv/meow`, {
        params: {
          date1,
          date2,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setInv(data.articles);
        console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      });
  };

  return (
    <>
      <h3 className="hhhhh"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Choisir les dates pour l'inventaire
      </h3>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form style={{ display: "flex" }} onSubmit={handleSubmit}>
          <input
            style={{ width: "200px", marginRight: "50px" }}
            onChange={(e) => setDate1(e.target.value)}
            type="date"
            name="date1"
            id="date1"
          />
          <input
            style={{ width: "200px" }}
            onChange={(e) => setDate2(e.target.value)}
            type="date"
            name="date2"
            id="date2"
          />
          <span style={{ display: "block" }}>
            <div className="VaButton">
            <input
              style={{ marginLeft:"20px", width: "100px", color: "white", backgroundColor: "#5b08a7" }}
              type="submit"
              value={"Valider"}
            />
            </div>

          </span>
        </form>
      </div>
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}
      {!loading && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>BC/BS</th>
              <th>Fournisseur/Bénéficiaire</th>
              <th>Référence</th>
              <th>Désignation</th>
              <th>Quantité</th>
              <th>Status</th>
              <th>Catégorie</th>
            </tr>
          </thead>
          <tbody>
            {inv.length > 0 ? (
              inv.map((inv) => (
                <tr key={inv.id}>
                  <td>{inv.date}</td>
                  <td>{inv.bon_commande}</td>
                  <td>{inv.supplier_id}</td>
                  <td>{inv.ref}</td>
                  <td>{inv.name}</td>
                  <td>{inv.quantity}</td>
                  <td>{inv.status}</td>
                  <td>{getCategoryNameById(category, inv.category_id)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">
                  <p style={{ textAlign: "center", fontSize: "20px" }}>
                    Aucun article trouvé
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

      )}
      <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <button className="hhhhh" style={{marginTop:"20px", width: "100px", height: "40px", color: "white", backgroundColor: "#5b08a7" }} onClick={handlePrint}>Imprimer</button>
      </div>
    </>
  );
}
