import React, { useState } from "react";

const TaskerSignupStepTwo = ({ formData, handleChange, nextStep, prevStep }) => {
    // Service options and their rates
    const serviceOptions = [
        { name: "Cleaning", rate: 25 },
        { name: "Plumbing", rate: 30 },
        { name: "Electrician", rate: 35 },
        { name: "Gardening", rate: 20 },
        { name: "Carpentry", rate: 40 },
    ];

    // Add a service to the formData
    const addService = (service) => {
        // Ensure the service is not already in the list
        if (!formData.services.find((item) => item.name === service.name)) {
            const updatedServices = [...formData.services, service];
            handleChange({ target: { name: "services", value: updatedServices } });
        }
    };

    // Remove a service from formData
    const removeService = (serviceName) => {
        const updatedServices = formData.services.filter((item) => item.name !== serviceName);
        handleChange({ target: { name: "services", value: updatedServices } });
    };

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
                    Area and Service Details
                </h3>
                <p
                    className="text-muted mb-4"
                    style={{
                        fontSize: "1rem",
                        lineHeight: "1.6",
                    }}
                >
                    Select your area and the services you provide. The rates for each service will be displayed automatically.
                </p>

                <form className="text-start">
                    {/* Area Selection */}
                    <div className="mb-3">
                        <label
                            htmlFor="area"
                            className="form-label"
                            style={{
                                fontWeight: "500",
                                color: "#5a6b81",
                            }}
                        >
                            Select Area
                        </label>
                        <select
                            className="form-select"
                            id="area"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                            }}
                        >
                            <option value="" disabled>
                                Choose your area
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

                    {/* Service Selection */}
                    <div className="mb-3">
                        <label
                            htmlFor="services"
                            className="form-label"
                            style={{
                                fontWeight: "500",
                                color: "#5a6b81",
                            }}
                        >
                            Select Service
                        </label>
                        <select
                            className="form-select"
                            id="services"
                            name="services"
                            onChange={(e) =>
                                addService(serviceOptions.find((service) => service.name === e.target.value))
                            }
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                            }}
                        >
                            <option value="" disabled>
                                Choose a service
                            </option>
                            {serviceOptions.map((service) => (
                                <option key={service.name} value={service.name}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Selected Services and Rates */}
                    {formData.services.length > 0 && (
                        <div className="mb-3">
                            <label
                                className="form-label"
                                style={{
                                    fontWeight: "500",
                                    color: "#5a6b81",
                                }}
                            >
                                Selected Services
                            </label>
                            <ul className="list-group">
                                {formData.services.map((service) => (
                                    <li
                                        key={service.name}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                        style={{
                                            borderRadius: "8px",
                                            border: "1px solid #d1d5db",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <span>{service.name}</span>
                                        <span style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                            <span style={{fontSize: "1rem", fontWeight: "500"}}>
                                                ${service.rate}/hr
                                            </span>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
                                                style={{
                                                    borderRadius: "8px",
                                                    fontWeight: "bold",
                                                    width: "28px",
                                                    height: "28px",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    padding: "0",
                                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                                    transition: "transform 0.2s ease-in-out",
                                                }}
                                                onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                                                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                                                onClick={() => removeService(service.name)}
                                            >
                                                <i className="bi bi-x-lg" style={{fontSize: "1rem"}}></i>
                                            </button>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="d-flex justify-content-between mt-4">
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
                            onClick={nextStep}
                            style={{
                                padding: "10px 20px",
                                fontWeight: "600",
                                backgroundColor: "#456fca",
                                border: "none",
                                borderRadius: "8px",
                            }}
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskerSignupStepTwo;
