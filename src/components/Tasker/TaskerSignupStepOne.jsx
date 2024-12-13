// eslint-disable-next-line no-unused-vars
import React from "react";
import "react-phone-input-2/lib/style.css";

// eslint-disable-next-line react/prop-types
const TaskerSignupStepOne = ({ formData, handleChange, nextStep }) => {
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
                    Personal Information
                </h3>
                <p
                    className="text-muted mb-4"
                    style={{
                        fontSize: "1rem",
                        lineHeight: "1.6",
                    }}
                >
                    Please provide your personal details below. This information will be used to set up your account
                    and ensure secure access.
                </p>
                <form className="text-start">
                    {/* First Name */}
                    <div className="mb-3">
                        <label
                            htmlFor="firstName"
                            className="form-label "
                            style={{
                                fontWeight: "500",
                                color: "#5a6b81",
                                display: "block",
                            }}
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                transition: "border-color 0.3s, box-shadow 0.3s",
                            }}
                            onFocus={(e) =>
                                (e.target.style.boxShadow = "0 0 5px rgba(69, 111, 202, 0.5)")
                            }
                            onBlur={(e) =>
                                (e.target.style.boxShadow = "none")
                            }
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div className="mb-3">
                        <label
                            htmlFor="lastName"
                            className="form-label"
                            style={{
                                fontWeight: "500",
                                color: "#5a6b81",
                                display: "block",
                            }}
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                transition: "border-color 0.3s, box-shadow 0.3s",
                            }}
                            onFocus={(e) =>
                                (e.target.style.boxShadow = "0 0 5px rgba(69, 111, 202, 0.5)")
                            }
                            onBlur={(e) =>
                                (e.target.style.boxShadow = "none")
                            }
                            required
                        />
                    </div>

                    {/* Mobile Number */}
                    <div className="mb-3">
                        <label
                            htmlFor="mobile"
                            className="form-label"
                            style={{
                                fontWeight: "500",
                                color: "#5a6b81",
                                display: "block",
                            }}
                        >
                            Mobile Number
                        </label>
                        <div className="input-group">
                            <span
                                className="input-group-text"
                                style={{
                                    backgroundColor: "#f8f9fa",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "8px 0 0 8px",
                                }}
                            >
                                🇮🇳 +91
                            </span>
                            <input
                                type="tel"
                                className="form-control"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter your mobile number"
                                style={{
                                    borderRadius: "0 8px 8px 0",
                                    border: "1px solid #d1d5db",
                                    padding: "10px",
                                    transition: "border-color 0.3s, box-shadow 0.3s",
                                }}
                                onFocus={(e) =>
                                    (e.target.style.boxShadow = "0 0 5px rgba(69, 111, 202, 0.5)")
                                }
                                onBlur={(e) =>
                                    (e.target.style.boxShadow = "none")
                                }
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label
                            htmlFor="email"
                            className="form-label"
                            style={{
                                fontWeight: "500",
                                color: "#5a6b81",
                                display: "block",
                            }}
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                transition: "border-color 0.3s, box-shadow 0.3s",
                            }}
                            onFocus={(e) =>
                                (e.target.style.boxShadow = "0 0 5px rgba(69, 111, 202, 0.5)")
                            }
                            onBlur={(e) =>
                                (e.target.style.boxShadow = "none")
                            }
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="form-label"
                            style={{
                                fontWeight: "500",
                                color: "#5a6b81",
                                display: "block",
                            }}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                                transition: "border-color 0.3s, box-shadow 0.3s",
                            }}
                            onFocus={(e) =>
                                (e.target.style.boxShadow = "0 0 5px rgba(69, 111, 202, 0.5)")
                            }
                            onBlur={(e) =>
                                (e.target.style.boxShadow = "none")
                            }
                            required
                        />
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

export default TaskerSignupStepOne;
