import { Link } from "react-router-dom";
import logo from "../assets/JobJunction.jpeg";
import profileIcon from "../assets/Profile.jpg";
import AuthModal from "./AuthModal";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const [cookies, , removeCookie] = useCookies(["token", "role"]); // Access and manage cookies
    const navigate = useNavigate();
    const location = useLocation();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const token = cookies.token;
    const role = cookies.role;

    const handleLogout = () => {
        removeCookie("isUserLoggedIn", { path: "/" });
        removeCookie("role", { path: "/" });
        removeCookie("token", { path: "/" });

        if (location.pathname === "/profile") {
            navigate("/");
        }

        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                {/* Logo and Brand */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            width: "45px",
                            height: "45px",
                            marginRight: "10px",
                            borderRadius: "50%",
                        }}
                    />
                    <span style={{ fontSize: "1.6rem", fontWeight: "bold" }}>
                        JobJunction
                    </span>
                </Link>

                {/* Toggle Button for Mobile View */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item mx-3">
                            <Link className="nav-link" to="/available-services">
                                Available Services
                            </Link>
                        </li>
                        {!token && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link mx-2" to="/tasker-signup">
                                        Become a Tasker
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-2" onClick={handleShow}>
                                        User Sign Up/Login
                                    </Link>
                                </li>
                            </>
                        )}
                        {token && (
                            <li className="nav-item dropdown">
                                <div
                                    className="nav-link dropdown-toggle d-flex align-items-center"
                                    id="profileDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{
                                        cursor: "pointer",
                                        padding: "0",
                                    }}
                                >
                                    <img
                                        src={profileIcon}
                                        alt="Profile"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            marginRight: "10px",
                                        }}
                                    />
                                </div>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="profileDropdown"
                                    style={{
                                        borderRadius: "5px",
                                    }}
                                >
                                    <li>
                                        <Link className="dropdown-item" to="/user-pending-request">
                                            Pending Request
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/profile">
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item text-danger"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Auth Modal */}
                <AuthModal show={show} handleClose={handleClose}/>
            </div>
        </nav>
    );
};

export default Navbar;
