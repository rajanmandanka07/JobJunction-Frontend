// eslint-disable-next-line no-unused-vars
import React from "react";
import { Modal } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AuthModal = ({ show, handleClose }) => {
    const navigate = useNavigate(); // React Router hook for navigation

    const handleLogin = () => {
        handleClose();
        navigate("/login"); // Redirect to the login page
    };

    const handleSignup = () => {
        handleClose();
        navigate("/user-signup"); // Redirect to the signup page
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body className="text-center p-4">
                {/* Header */}
                <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#2C3E50" }}>
                    JobJunction
                </h2>
                {/* Additional Text */}
                <p style={{ fontSize: "1rem", color: "#6c757d", marginTop: "0.5rem" }}>
                    Your gateway to endless career opportunities!
                </p>

                {/* Signup and Login Buttons */}
                <div className="d-grid gap-3 mt-4">
                    <button
                        className="btn btn-success"
                        style={{
                            width: "100%",
                            padding: "12px",
                            textAlign: "center",
                            borderRadius: "50px",
                            fontSize: "1rem",
                            fontWeight: "600",
                        }}
                        onClick={handleSignup}
                    >
                        Sign up
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        style={{
                            width: "100%",
                            padding: "12px",
                            textAlign: "center",
                            borderRadius: "50px",
                            fontSize: "1rem",
                            fontWeight: "600",
                        }}
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>

                {/* Footer Text */}
                <p className="mt-4 text-muted" style={{ fontSize: "0.85rem" }}>
                    By signing up you agree to our{" "}
                    <Link to="/#" className="text-decoration-none">
                        Terms of Use
                    </Link>{" "}
                    and{" "}
                    <Link to="/#" className="text-decoration-none">
                        Privacy Policy
                    </Link>.
                </p>
            </Modal.Body>
        </Modal>
    );
};

export default AuthModal;
