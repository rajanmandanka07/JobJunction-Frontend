// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const TaskerSignupStepThree = ({ formData, prevStep, setFormData }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (isSubmitted) return; // Prevent multiple submissions
        setIsSubmitted(true);

        try {
            // Make POST request to the backend API
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.mobile,
                password: formData.password, // Ensure password is part of `formData`
                area: formData.area,
                role: "tasker", // Assuming "tasker" is the role
                services: formData.services
            });

            console.log("Response from backend:", response.data);

            if(response.data.success && response.status === 201){
                // Show success toast notification
                toast.success("Tasker registered successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    onClose: () => {
                        // Reset the form data
                        setFormData({
                            firstName: "",
                            lastName: "",
                            phone: "",
                            email: "",
                            // Add other form fields as needed
                        });

                        // Navigate to the home page
                        navigate("/");
                    },
                });
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

            // Optionally, navigate or reset form after successful submission
        } catch (error) {
            console.error("Error during registration:", error);

            // Show error toast notification
            toast.error("Failed to register tasker. Please try again.", {
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
        <div className="card shadow-lg p-4 m-4" style={{ borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h3 className="text-center mb-2" style={{ color: "#3b3b3b", fontWeight: "600" }}>
                Review and Submit Your Details
            </h3>

            <p className="text-center mb-4" style={{ color: "#6c757d", fontSize: "1rem" }}>
                Please review the information you’ve provided. If everything looks good, click the "Submit" button to finalize your registration.
            </p>

            {/* Personal Information */}
            <div className="mb-4">
                <h5 className="mb-4" style={{ color: "#5a6b81", fontWeight: "500", fontSize: "1.25rem" }}>Personal Information</h5>
                <div className="row g-4 text-start">
                    <div className="col-md-6">
                        <label className="form-label" style={{ fontWeight: '500', color: '#5a6b81' }}>First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.firstName}
                            disabled
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                fontSize: "1rem"
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" style={{ fontWeight: '500', color: '#5a6b81' }}>Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.lastName}
                            disabled
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                fontSize: "1rem"
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" style={{ fontWeight: '500', color: '#5a6b81' }}>Mobile</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.mobile}
                            disabled
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                fontSize: "1rem"
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" style={{ fontWeight: '500', color: '#5a6b81' }}>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={formData.email}
                            disabled
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                fontSize: "1rem"
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Area and Service Details */}
            <div className="mb-4">
                <h5 className="mb-4" style={{ color: "#5a6b81", fontWeight: "500", fontSize: "1.25rem" }}>Area and Service Details</h5>

                {/* Area Input */}
                <div className="mb-4">
                    <label className="form-label" style={{ fontWeight: '500', color: '#5a6b81' }}>Area</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.area}
                        disabled
                        style={{
                            borderRadius: "8px",
                            border: "1px solid #d1d5db",
                            padding: "10px",
                            fontSize: "1rem"
                        }}
                    />
                </div>

                {/* Selected Services */}
                {formData.services && formData.services.length > 0 ? (
                    <>
                        <h6 className="mb-3" style={{ fontWeight: "500", color: "#5a6b81" }}>Selected Services</h6>
                        <ul className="list-group" style={{ borderRadius: "8px" }}>
                            {formData.services.map((service, index) => (
                                <li
                                    key={index}
                                    className="list-group-item d-flex justify-content-between align-items-center mb-1"
                                    style={{
                                        borderRadius: "8px",
                                        border: "1px solid #d1d5db",
                                        padding: "10px",
                                        fontSize: "1rem"
                                    }}
                                >
                                    <span>{service.name}</span>
                                    <span>₹{service.rate}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p className="text-muted" style={{ fontWeight: "500", color: "#5a6b81" }}>No services selected.</p>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-between align-items-center mt-1">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={prevStep}
                    style={{
                        padding: "10px 20px",
                        fontWeight: "600",
                        borderRadius: "8px",
                    }}
                >
                    Back
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    style={{
                        borderRadius: "8px",
                        padding: "10px 20px",
                        fontWeight: "600",
                    }}
                >
                    Submit
                </button>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default TaskerSignupStepThree;
