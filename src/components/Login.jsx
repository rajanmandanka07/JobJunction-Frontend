// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" }); // State to manage form input
    const [isSubmitted, setIsSubmitted] = useState(false); // State to prevent multiple submissions
    const [cookies, setCookie] = useCookies(["role", "token", "isUserLoggedIn"]); // Cookies for session persistence
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleLogin = async (event) => {
        event.preventDefault();

        // Prevent multiple submissions
        if (isSubmitted) return;
        setIsSubmitted(true);

        try {
            // Make POST request to the backend API
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            console.log("Response from backend:", response.data);

            if (response.data.success && response.status === 200) {
                const { role, token } = response.data;

                // Show success toast notification
                toast.success(response.data.message || "Login successful. ", {
                    position: "top-center",
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    onClose: () => {
                        setFormData({
                            email: "",
                            password: "",
                        });
                        // To check Logged in
                        setCookie("isUserLoggedIn", true, { path: "/", maxAge: 7 * 24 * 60 * 60 });

                        // Role of user
                        setCookie("role", role, { path: "/", maxAge: 7 * 24 * 60 * 60 });

                        // Store token in cookies
                        setCookie("token", token, { path: "/", maxAge: 7 * 24 * 60 * 60 });
                        navigate("/");
                    },
                });
            } else {
                // Handle error response from the backend
                toast.error(response.data.message || "Login failed. Please check your credentials.", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        } catch (error) {
            console.error("Error during login:", error);

            // Show error toast notification
            toast.error("Failed to log in. Please try again.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });
        } finally {
            // Allow resubmission in case of failure
            setIsSubmitted(false);
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "#f5f5f5" }}
        >
            <div
                className="p-4 rounded shadow-sm"
                style={{
                    width: "400px",
                    backgroundColor: "#fff",
                }}
            >
                {/* Logo / Header */}
                <h2
                    className="text-center mb-4"
                    style={{
                        fontSize: "1.8rem",
                        fontWeight: "bold",
                        color: "#2C3E50",
                    }}
                >
                    JobJunction
                </h2>

                {/* Login Form */}
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Control
                            type="email"
                            placeholder="Email Address"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </Form.Group>

                    <div className="d-grid">
                        <Button
                            type="submit"
                            className="btn btn-success"
                            style={{ padding: "10px" }}
                        >
                            Login
                        </Button>
                    </div>
                </Form>

                {/* Additional Links */}
                <p
                    className="text-center text-muted mt-4"
                    style={{ fontSize: "0.85rem" }}
                >
                    Don’t have an account?{" "}
                    <Link to="/user-signup" className="text-decoration-none">
                        Sign up
                    </Link>
                </p>
                <p
                    className="text-center text-muted"
                    style={{ fontSize: "0.85rem" }}
                >
                    <Link to="/forgot-password" className="text-decoration-none">
                        Forgot your password?
                    </Link>
                </p>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default Login;
