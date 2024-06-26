import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState(""); // add a state for search term
    const [category, setCategory] = useState([]);
    useEffect(() => {
      getArticles();
      getCategory();
    }, [currentPage]);
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
    const getArticles = () => {
      setLoading(true);
      axiosClient.get(`/articles?page=${currentPage}`)
        .then(({ data }) => {
          console.log('%csrc\Components\articles\articles.jsx:17 object', 'color: #007acc;', data.articles);
          setArticles(data.articles.data);
          setTotalPages(data.articles.last_page);
        })
        .catch(error => {
          console.error("Error fetching articles:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    const getCategoryNameById = (categories, id) => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : null;
    };
    const handlePageChange = (page) => {
      setCurrentPage(page);
    }

    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    }

    const filteredArticles = articles.filter((article) => {
      return article.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
          <h1>Articles</h1>
          <Link className="btn-add" to="/article/new">Nouveau article</Link>
        </div>
        <div>
          <input type="text" name="FilterInput" id="FilterInput" value={searchTerm} onChange={handleSearch} />
        </div>
        {loading && <p>Loading...</p>}
        <div className="card animated fadeInDown">
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
              {filteredArticles.map((a) => (
                <tr key={a.id}>
                  <td>{a.date}</td>
                  <td>{a.bon_commande}</td>
                  <td>{a.supplier_id}</td>
                  <td>{a.ref}</td>
                  <td>{a.name}</td>
                  <td>{a.quantity}</td>
                  <td>{a.status}</td>
                  <td>{getCategoryNameById(category, a.category_id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{display:"flex",justifyContent:'center'}} className="pagination">
          {currentPage > 1 && <button onClick={() => handlePageChange(currentPage - 1)}>précédent</button>}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => handlePageChange(page)} className={page === currentPage ? "active" : ""}>{page}</button>
          ))}
          {currentPage < totalPages && <button onClick={() => handlePageChange(currentPage + 1)}>Suivant</button>}
        </div>
      </div>
    );
  }
