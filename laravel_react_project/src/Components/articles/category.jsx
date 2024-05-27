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



  return (
    <div className="card animated fadeInDown">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Categories</h1>
                <Link className="btn-add" to="/category/new">Nouvelle Categorie</Link>
            </div>
            <br/>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Actions</th>
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
                      Modifier
                    </Link>
                    &nbsp;

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
