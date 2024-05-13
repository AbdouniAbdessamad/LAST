import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authUser, setAuthUser] = useState({});

  useEffect(() => {
    getUsers();
    getAuthUser();
  }, []);

  const getAuthUser = () => {
    setLoading(true);
    axiosClient
      .get("/user")
      .then(({ data }) => {
        setLoading(false);
        console.log(data);
        setAuthUser(data);
        setError(""); // Reset error state if fetching is successful
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        setError(error); // Set error message
      });
  };

  const onDeleteClick = user => {
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        getUsers();
        setError(""); // Reset error state if deletion is successful
      })
      .catch(error => {
        console.log(error);
        setError(`Impossible de supprimer utilisateur ${user.id}.Merci de ne pas réessayer `); // Set error message
      });
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
        setError(""); // Reset error state if fetching is successful
      })
      .catch(error => {
        setLoading(false);
        setError(error); // Set error message
      });
  };

  return (
    <div>
      {authUser && authUser.id == 1 ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <h1>Users</h1>
            <Link className="btn-add" to="/users/new">
              Add new
            </Link>
          </div>
          {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
          <div className="card animated fadeInDown">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {loading && (
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-center">
                      Loading...
                    </td>
                  </tr>
                </tbody>
              )}
              {!loading && (
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <Link className="btn-edit" to={"/users/" + u.id}>
                          Edit
                        </Link>
                        &nbsp;
                        <button
                          className="btn-delete"
                          onClick={() => onDeleteClick(u)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      ) : (
        <h1 style={{color: "red", display: "flex",justifyContent: "center",alignItems: "center" }}>Impossible d'acceder cette page en tant que simple utilisateur</h1>
      )}
    </div>
  );
}
