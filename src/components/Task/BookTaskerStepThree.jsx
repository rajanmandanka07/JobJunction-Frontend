import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";

const BookTaskerStepThree = ({ formData, prevStep, setFormData }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [cookies] = useCookies(["token"]);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (isSubmitted) return; // Prevent multiple submissions
        setIsSubmitted(true);

        try {
            const response = await axios.post('http://localhost:5000/api/task/create-request', formData, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                },
            });

            if (response.status === 201) {
                // Success notification
                toast.success("Task submitted successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    onClose: () => {
                        setFormData({
                            taskId: "",
                            taskName: "",
                            taskCategory: "",
                            taskPrice: "",
                            taskDescription: "",
                            timeSlot: "",
                            date: "",
                            area: "",
                            address: "",
                        })
                        navigate("/user-pending-request");
                    }
                });
            } else {
                // Error notification
                toast.error("Failed to submit task. Please try again.", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        } catch (error) {
            // Network error notification
            toast.error("An error occurred while submitting the task.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });
            console.error("Error:", error);
        } finally {
            setIsSubmitted(false);
        }
    };

    return (
        <div className="card shadow-lg p-4 m-4" style={{ borderRadius: "8px", border: "1px solid #e0e0e0" }}>
            <h3 className="text-center mb-2" style={{ color: "#3b3b3b", fontWeight: "600" }}>
                Review and Submit Your Task Details
            </h3>

            <p className="text-center mb-4" style={{ color: "#6c757d", fontSize: "1rem" }}>
                Please review the information you’ve provided. If everything looks good, click the "Submit" button to finalize.
            </p>

            {/* Task Details */}
            <div className="mb-4">
                <h5 className="mb-4" style={{ color: "#5a6b81", fontWeight: "500", fontSize: "1.25rem" }}>Task Details</h5>
                <div className="row g-4 text-start">
                    <div className="col-md-6">
                        <label className="form-label" style={{fontWeight: "500", color: "#5a6b81"}}>Task Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.taskName}
                            disabled
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                fontSize: "1rem",
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" style={{fontWeight: "500", color: "#5a6b81"}}>Category</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.taskCategory}
                            disabled
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                fontSize: "1rem",
                            }}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label" style={{fontWeight: "500", color: "#5a6b81"}}>Description</label>
                        <textarea
                            className="form-control"
                            value={formData.taskDescription}
                            disabled
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                fontSize: "1rem",
                            }}
                        ></textarea>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" style={{fontWeight: "500", color: "#5a6b81"}}>Time Slot</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.timeSlot}
                            disabled
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                fontSize: "1rem",
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" style={{fontWeight: "500", color: "#5a6b81"}}>Date</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.date}
                            disabled
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                fontSize: "1rem",
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" style={{fontWeight: "500", color: "#5a6b81"}}>Area</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.area}
                            disabled
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                fontSize: "1rem",
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" style={{fontWeight: "500", color: "#5a6b81"}}>Price</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.taskPrice}
                            disabled
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                fontSize: "1rem",
                            }}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label" style={{fontWeight: "500", color: "#5a6b81"}}>Address</label>
                        <textarea
                            className="form-control"
                            value={formData.address}
                            disabled
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                fontSize: "1rem",
                            }}
                        ></textarea>
                    </div>
                </div>
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

export default BookTaskerStepThree;
