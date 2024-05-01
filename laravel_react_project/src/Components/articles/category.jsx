import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    setLoading(true);
    axiosClient
      .get('/categories')
      .then(({ data }) => {
        setLoading(false);
        if(data.categories){
          setCategory(data.categories);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onDeleteClick = (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }
    axiosClient.delete(`/categories/${categoryId}`)
      .then(() => {
        getCategory();
      })
      .catch(() => {
        console.error("Error deleting category");
      });
  };

  return (
    <div className="card animated fadeInDown">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Categories</h1>
                <Link className="btn-add" to="/category/new">Add new</Link>
            </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center">
                Loading...
              </td>
            </tr>
          ) : (
            category && category.length > 0 ? (
              category.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>
                    <Link className="btn-edit" to={"/category/" + u.id}>
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      className="btn-delete"
                      onClick={() => onDeleteClick(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3"></td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
