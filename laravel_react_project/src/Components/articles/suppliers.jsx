import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";

export default function Supplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getSuppliers();
  }, [currentPage]);

  const getSuppliers = () => {
    setLoading(true);
    axiosClient
      .get(`/suppliers?page=${currentPage}`)
      .then(({ data }) => {
        if (data?.data) {
          setSuppliers(data.data);
          setTotalPages(data.meta.last_page);
          setError(null);
        }
      })
      .catch(error => {
        console.error("Error fetching suppliers:", error);
        setError("Error fetching suppliers. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDeleteClick = (supplier) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) {
      return;
    }
    axiosClient.delete(`/suppliers/${supplier.id}`).then(() => {
      getSuppliers();
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="card animated fadeInDown">
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>Fournisseurs</h1>
        <Link className="btn-add" to="/supplier/new">Add new</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Country</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="7" className="text-center">
                {error}
              </td>
            </tr>
          ) : suppliers && suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.city}</td>
                <td>{supplier.country}</td>
                <td>{supplier.address}</td>
                <td>{supplier.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No suppliers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      &nbsp;
      <div style={{display:"flex",justifyContent:'center'}} className="pagination">
        {currentPage > 1 && <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button key={page} onClick={() => handlePageChange(page)} className={page === currentPage ? "active" : ""}>{page}</button>
        ))}
        {currentPage < totalPages && <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>}
      </div>
    </div>
  );
}
