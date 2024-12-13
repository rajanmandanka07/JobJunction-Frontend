import React, { useState } from "react";

const BookTaskerStepTwo = ({ formData, handleChange, nextStep, prevStep }) => {
    // Get today's date
    const today = new Date();

    // Generate the next 10 days for the date input
    const nextTenDays = Array.from({ length: 10 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return date.toISOString().split("T")[0];
    });

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
                    Please provide the following details about your task. Ensure the details
                    are accurate to avoid delays.
                </p>
                <form className="text-start">
                    {/* Time Slot Selection */}
                    <div className="mb-3">
                        <label
                            htmlFor="timeSlot"
                            className="form-label"
                            style={{ fontWeight: "500", color: "#5a6b81" }}
                        >
                            Select Time Slot
                        </label>
                        <div className="d-flex gap-3">
                            <button
                                type="button"
                                className={`btn ${
                                    formData.timeSlot === "Morning (9 AM - 12 PM)" ? "btn-primary" : "btn-outline-secondary"
                                }`}
                                onClick={() => handleChange({ target: { name: "timeSlot", value: "Morning (9 AM - 12 PM)" } })}
                                style={{
                                    borderRadius: "8px",
                                    fontWeight: "500",
                                    padding: "10px 20px",
                                }}
                            >
                                Morning (9 AM - 12 PM)
                            </button>
                            <button
                                type="button"
                                className={`btn ${
                                    formData.timeSlot === "Afternoon (1 PM - 4 PM)" ? "btn-primary" : "btn-outline-secondary"
                                }`}
                                onClick={() => handleChange({ target: { name: "timeSlot", value: "Afternoon (1 PM - 4 PM)" } })}
                                style={{
                                    borderRadius: "8px",
                                    fontWeight: "500",
                                    padding: "10px 20px",
                                }}
                            >
                                Afternoon (1 PM - 4 PM)
                            </button>
                            <button
                                type="button"
                                className={`btn ${
                                    formData.timeSlot === "Evening (5 PM - 8 PM)" ? "btn-primary" : "btn-outline-secondary"
                                }`}
                                onClick={() => handleChange({ target: { name: "timeSlot", value: "Evening (5 PM - 8 PM)" } })}
                                style={{
                                    borderRadius: "8px",
                                    fontWeight: "500",
                                    padding: "10px 20px",
                                }}
                            >
                                Evening (5 PM - 8 PM)
                            </button>
                        </div>
                    </div>

                    {/* Date Selection */}
                    <div className="mb-3">
                        <label
                            htmlFor="date"
                            className="form-label"
                            style={{ fontWeight: "500", color: "#5a6b81" }}
                        >
                            Select Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={nextTenDays[0]}
                            max={nextTenDays[nextTenDays.length - 1]}
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

                    {/* Area Dropdown */}
                    <div className="mb-3">
                        <label
                            htmlFor="area"
                            className="form-label"
                            style={{ fontWeight: "500", color: "#5a6b81" }}
                        >
                            Select Area
                        </label>
                        <select
                            id="area"
                            name="area"
                            className="form-select"
                            value={formData.area}
                            onChange={handleChange}
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
                        >
                                <option value="" disabled>
                                    Select area
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

                    {/* Address Text Area */}
                    <div className="mb-3">
                        <label
                            htmlFor="address"
                            className="form-label"
                            style={{ fontWeight: "500", color: "#5a6b81" }}
                        >
                            Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            className="form-control"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter the task address"
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
                            rows="4"
                            required
                        ></textarea>
                    </div>

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

export default BookTaskerStepTwo;