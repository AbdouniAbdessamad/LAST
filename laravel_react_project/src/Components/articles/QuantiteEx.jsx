import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";

export default function QuantiteEx() {
  const [quantities, setQuantities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getQuantities();
  }, []);

  const getQuantities = () => {
    setLoading(true);
    axiosClient
      .get('/low')
      .then(({ data }) => {
        setLoading(false);
        if (data.lowQuantities) {
          setQuantities(data.lowQuantities);
        } else {
          console.error('Unexpected response data structure:', data);
          setQuantities([]);
        }
      })
      .catch(() => {
        setLoading(false);

      });
  };



  return (
    <div className="card animated fadeInDown">
      <table>
        <thead>
          <tr>
            <th>Référence</th>
            <th>Nom</th>
            <th>Quantité</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
          ) : ( quantities && quantities.length > 0 ? (
            quantities.map((u) => (
              <tr key={u.id}>
                <td><span className="NAMENAME">{u.ref}</span></td>
                <td > <span className="NAMENAME">{u.name}</span></td>
                <td><span className="NAMENAME">{u.quantity}</span></td>
              </tr>
            ))) : (
                <tr>
                  <td colSpan="5"></td>
                </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
