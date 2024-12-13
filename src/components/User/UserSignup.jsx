import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserSignup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        area: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent multiple submissions
        if (isSubmitted) return;
        setIsSubmitted(true);

        try {
            // Make POST request to the backend API
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password, // Ensure password is part of formData
                area: formData.area,
                role: "user", // Assuming "user" is the role
            });

            console.log("Response from backend:", response.data);

            if (response.data.success && response.status === 201) {
                // Show success toast notification
                toast.success("User registered successfully!", {
                    position: "top-center",
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    onClose: () => {
                        // Reset the form data
                        setFormData({
                            firstName: "",
                            lastName: "",
                            phone: "",
                            email: "",
                            password: "",
                            area: "",
                        });

                        // Navigate to the home page
                        navigate("/");
                    },
                });
                setIsSubmitted(false);
            } else {
                toast.error(response.data.message || "Registration failed. Please try again.", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                setIsSubmitted(false);
            }
        } catch (error) {
            console.error("Error during registration:", error);

            // Show error toast notification
            toast.error("Failed to register user. Please try again.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });

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

                {/* Signup Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3 d-flex">
                        {/* Country Code Input */}
                        <div className="input-group me-2" style={{ flex: "0 0 25%" }}>
                            <span
                                className="input-group-text"
                                style={{ backgroundColor: "#f8f9fa" }}
                            >
                                🇮🇳 +91
                            </span>
                        </div>
                        {/* Phone Number Input */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <select
                            className="form-control"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select Area
                            </option>
                            <option value="Kalavad Road">Kalavad Road</option>
                            <option value="University Road">University Road</option>
                            <option value="Yagnik Road">Yagnik Road</option>
                            <option value="Nana Mava Road">Nana Mava Road</option>
                            <option value="Kothariya Road">Kothariya Road</option>
                            <option value="Mavdi">Mavdi</option>
                            <option value="Sardar Nagar">Sardar Nagar</option>
                            <option value="Jubilee Chowk">Jubilee Chowk</option>
                            <option value="Bhaktinagar">Bhaktinagar</option>
                            <option value="Raiya Road">Raiya Road</option>
                        </select>
                    </div>

                    {/* Terms and Privacy Policy */}
                    <p
                        className="text-center text-muted mb-4"
                        style={{ fontSize: "0.85rem" }}
                    >
                        By clicking below and creating an account, I agree to{" "}
                        <a href="/terms" className="text-decoration-none">
                            JobJunction&#39;s Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-decoration-none">
                            Privacy Policy
                        </a>
                        .
                    </p>

                    {/* Submit Button */}
                    <div className="d-grid">
                        <button
                            className="btn btn-success"
                            style={{ padding: "10px" }}
                            type="submit"
                            disabled={isSubmitted}
                        >
                            {isSubmitted ? "Submitting..." : "Create account"}
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserSignup;
