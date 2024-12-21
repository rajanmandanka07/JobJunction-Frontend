// eslint-disable-next-line no-unused-vars
import React from "react";
import "react-phone-input-2/lib/style.css";

const BookTaskerStepOne = ({ formData, handleChange, nextStep }) => {

    return (
        <div className="m-5 d-flex justify-content-center mt-4">
            <div
                className="card shadow-lg p-5"
                style={{
                    maxWidth: "600px",
                    width: "100%",
                    borderRadius: "12px",
                    border: "none",
                }}
            >
                <h3
                    className="text-left mb-2"
                    style={{
                        fontSize: "1.8rem",
                        fontWeight: "600",
                        color: "#3c5365",
                    }}
                >
                    Task Details
                </h3>
                <p
                    className="text-muted mb-4"
                    style={{
                        fontSize: "1rem",
                        lineHeight: "1.6",
                    }}
                >
                    Provide the details of the task you are creating. This information will be used to manage the task effectively.
                </p>
                <form className="text-start">
                    {/* Task Name */}
                    <div className="mb-3">
                        <label
                            htmlFor="taskName"
                            className="form-label"
                            style={{
                                fontWeight: "500",
                                color: "#5a6b81",
                                display: "block",
                            }}
                        >
                            Task Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="taskName"
                            name="taskName"
                            value={formData.taskName} // Dummy data
                            disabled // Disable the input
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                backgroundColor: "#f8f9fa",
                                cursor: "not-allowed",
                            }}
                        />
                    </div>

                    {/* Task Category */}
                    <div className="mb-3">
                        <label
                            htmlFor="taskCategory"
                            className="form-label"
                            style={{
                                fontWeight: "500",
                                color: "#5a6b81",
                                display: "block",
                            }}
                        >
                            Task Category
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="taskCategory"
                            name="taskCategory"
                            value={formData.taskCategory} // Dummy data
                            disabled // Disable the input
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                backgroundColor: "#f8f9fa",
                                cursor: "not-allowed",
                            }}
                        />
                    </div>

                    {/* Task Price */}
                    <div className="mb-3">
                        <label
                            htmlFor="taskCategory"
                            className="form-label"
                            style={{
                                fontWeight: "500",
                                color: "#5a6b81",
                                display: "block",
                            }}
                        >
                            Task Price
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="taskCategory"
                            name="taskCategory"
                            value={formData.taskPrice} // Dummy data
                            disabled // Disable the input
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                backgroundColor: "#f8f9fa",
                                cursor: "not-allowed",
                            }}
                        />
                    </div>

                    {/* Task Description */}
                    <div className="mb-4">
                        <label
                            htmlFor="taskDescription"
                            className="form-label"
                            style={{
                                fontWeight: "500",
                                color: "#5a6b81",
                                display: "block",
                            }}
                        >
                            Task Description
                        </label>
                        <textarea
                            className="form-control"
                            id="taskDescription"
                            name="taskDescription"
                            value={formData.taskDescription}
                            onChange={handleChange}
                            placeholder="Provide a brief description of the task"
                            rows="4"
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                resize: "none",
                            }}
                            required
                        ></textarea>
                    </div>

                    {/* Next Button */}
                    <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={nextStep}
                        style={{
                            padding: "12px",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            backgroundColor: "#456fca",
                            border: "none",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.2s",
                        }}
                        onMouseDown={(e) =>
                            (e.target.style.transform = "scale(0.95)")
                        }
                        onMouseUp={(e) =>
                            (e.target.style.transform = "scale(1)")
                        }
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookTaskerStepOne;