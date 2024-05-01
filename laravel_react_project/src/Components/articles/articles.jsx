import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getArticles();
    }, []);

    const getArticles = () => {
        setLoading(true);
        axiosClient.get('/articles')
            .then(({ data }) => {
                console.log('%csrc\Components\articles\articles.jsx:17 object', 'color: #007acc;', data.articles);
                setArticles(data.articles);
            })
            .catch(error => {
                console.error("Error fetching articles:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const onDeleteClick = (article) => {
        if (!window.confirm("Are you sure you want to delete this article?")) {
            return;
        }
        axiosClient.delete(`/articles/${article.id}`)
            .then(() => {
                setArticles(articles.filter(a => a.id !== article.id));
            })
            .catch(error => {
                console.error("Error deleting article:", error);
            });
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Articles</h1>
                <Link className="btn-add" to="/article/new">Add new</Link>
            </div>
            {loading && <p>Loading...</p>}
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>BC/BD</th>
                            <th>Supplier</th>
                            <th>Reference</th>
                            <th>Designation</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Category</th>
                            <th>Last Editor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((a) => (
                            <tr key={a.id}>
                                <td>{a.id}</td>
                                <td>{a.date}</td>
                                <td>{a.bon_commande}</td>
                                <td>{a.supplier_id}</td>
                                <td>{a.ref}</td>
                                <td>{a.name}</td>
                                <td>{a.quantity}</td>
                                <td>{a.status}</td>
                                <td>{a.category_id}</td>
                                <td>{a.last_editor_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
