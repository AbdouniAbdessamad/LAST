import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.get("/logout").then(({}) => {
            setUser(null);
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div className="title">ABDOUNISM</div>
                    {user && user.id === 1 ? ( // Check if user object exists and its ID is 1
                        // If the condition is true, render the following JSX
                        <div className="NavBarElements">
                            <Link className="navlink" to="/users">
                                Utilisateurs
                            </Link>
                        </div>
                    ) : // If the condition is false, render nothing
                    null}

                    <div className="NavBarElements">
                        <Link className="navlink" to="/articles">
                            Articles
                        </Link>
                    </div>
                    <div className="NavBarElements">
                        <Link className="navlink" to="/suppliers">
                            Fournisseurs
                        </Link>
                    </div>
                    <div className="NavBarElements">
                        <Link className="navlink" to="/category">
                            Categories
                        </Link>
                    </div>
                    <div className="NavBarElements">
                        <Link className="navlink" to="/QuantiteEx">
                            Quantité existante
                        </Link>
                    </div>
                    <div className="NavBarElements">
                        <Link
                            className="navlink"
                            to="/Inventaire
"
                        >
                            Inventaire
                        </Link>
                    </div>
                    <div>
                        <span className="px-2 mx-6">
                            <strong>
                                <Link to="/profile">{user.name}</Link>
                            </strong>
                        </span>
                        &nbsp;&nbsp;
                        <a href="#" onClick={onLogout} className="btn-logout">
                            {" "}
                            Se déconnecter
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
