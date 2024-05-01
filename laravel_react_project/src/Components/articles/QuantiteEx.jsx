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

  const onDeleteClick = quantity => {
    if (!window.confirm("Are you sure you want to delete this quantity?")) {
      return
    }
    axiosClient.delete(`/low/${quantity.id}`)
      .then(() => {
        getQuantities()
      })
  }

  return (
    <div className="card animated fadeInDown">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Reference</th>
            <th>Name</th>
            <th>Quantity</th>
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
                <td>{u.id}</td>
                <td>{u.ref}</td>
                <td>{u.name}</td>
                <td>{u.quantity}</td>
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
