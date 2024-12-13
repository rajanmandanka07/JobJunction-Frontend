import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./BookTasker.css"; // Reuse the TaskerSignup CSS or create a new one
import BookTaskerStepOne from "./BookTaskerStepOne";
import BookTaskerStepTwo from "./BookTaskerStepTwo";
import BookTaskerStepThree from "./BookTaskerStepThree";

const BookTasker = () => {
    const location = useLocation();
    const { taskId, taskName, taskCategory } = location.state || {};

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        taskId: taskId || "",
        taskName: taskName || "",
        taskCategory: taskCategory || "",
        taskPrice: "",
        taskDescription: "",
        timeSlot: "",
        date: "",
        area: "",
        address: "",
    });

    useEffect(() => {
        // Retrieve services from localStorage
        const storedServices = localStorage.getItem("services");

        if (storedServices) {
            const services = JSON.parse(storedServices);

            // Find the service by taskId
            const service = services.find((item) => item.id === Number(taskId));

            // If the service is found, update the formData with the price
            if (service) {
                setFormData((prevData) => ({
                    ...prevData,
                    taskPrice: service.price,
                }));
            }
        }
    }, [taskId]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Navigate to the next step
    const nextStep = () => {
        setStep(step + 1);
    };

    // Navigate to the previous step
    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <div className="container mt-4">
            {/* Progress Bar */}
            <div className="d-flex justify-content-center align-items-center">
                <div className="progresses">
                    <div className={step >= 1 ? "steps" : ""}>
                        <span className={step >= 1 ? "active" : ""}>
                            {step >= 1 ? <i className="fa fa-check"></i> : "1"}
                        </span>
                    </div>

                    <span className={`line ${step >= 2 ? "active-line" : ""}`}></span>

                    <div className={step >= 2 ? "steps" : "steps-not-active"}>
                        <span className={step >= 2 ? "active" : ""}>
                            {step >= 2 ? <i className="fa fa-check"></i> : "2"}
                        </span>
                    </div>

                    <span className={`line ${step >= 3 ? "active-line" : ""}`}></span>

                    <div className={step >= 3 ? "steps" : "steps-not-active"}>
                        <span className={step >= 3 ? "active" : ""}>
                            {step >= 3 ? <i className="fa fa-check"></i> : "3"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Step Components */}
            {step === 1 && (
                <BookTaskerStepOne
                    formData={formData}
                    handleChange={handleChange}
                    nextStep={nextStep}
                />
            )}

            {step === 2 && (
                <BookTaskerStepTwo
                    formData={formData}
                    handleChange={handleChange}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            )}

            {step === 3 && (
                <BookTaskerStepThree
                    formData={formData}
                    prevStep={prevStep}
                />
            )}
        </div>
    );
};

export default BookTasker;
