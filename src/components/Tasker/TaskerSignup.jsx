// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import TaskerSignupStepOne from "./TaskerSignupStepOne.jsx";
import TaskerSignupStepTwo from "./TaskerSignupStepTwo.jsx";
import "../FormCss.css";
import TaskerSignupStepThree from "./TaskerSignupStepThree.jsx";

const TaskerSignup = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        password: "",
        area: "",
        services: [], // Array of { name, rate }
    });

    // Handle input change
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
            {/* New Progress Bar */}
            <div className="d-flex justify-content-center align-items-center">
                <div className="progresses">
                    <div className={step >= 1 ? 'steps' : ''}>
                        <span className={step >= 1 ? 'active' : ''}>
                            {step >= 1 ? <i className="fa fa-check"></i> : '1'}
                        </span>
                    </div>

                    <span className={`line ${step >= 2 ? 'active-line' : ''}`}></span>

                    {/*<div className='steps'>*/}
                    <div className={step >= 2 ? 'steps' : 'steps-not-active'}>
                        <span className={step >= 2 ? 'active' : ''}>
                            {step >= 2 ? <i className="fa fa-check"></i> : '2'}
                        </span>
                    </div>

                    <span className={`line ${step >= 3 ? 'active-line' : ''}`}></span>

                    {/*<div className='steps'>*/}
                    <div className={step >= 3 ? 'steps' : 'steps-not-active'}>
                        <span className={step >= 3 ? 'active' : ''}>
                            {step >= 3 ? <i className="fa fa-check"></i> : '3'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Form Step Components */}
            {step === 1 && (
                <TaskerSignupStepOne
                    formData={formData}
                    handleChange={handleChange}
                    nextStep={nextStep}
                />
            )}

            {step === 2 && (
                <TaskerSignupStepTwo
                    formData={formData}
                    handleChange={handleChange}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            )}

            {step === 3 && (
                <TaskerSignupStepThree
                    formData={formData}
                    prevStep={prevStep}
                    setFormData={setFormData}
                />
            )}
        </div>
    );
};

export default TaskerSignup;
