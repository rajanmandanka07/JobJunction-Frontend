import React, {useState, useEffect } from "react";

const Category = [
    "Home Services",
    "Personal Assistance",
    "Handyman Services",
    "Delivery Services",
    "Personal Assistance",
    "Beauty & Wellness",
];

const Service = [
    {
        id: 1,
        name: "Plumbing",
        category: "Home Services",
        rate: "230"
    },
    {
        id: 2,
        name: "Electrical Repair",
        category: "Home Services",
        rate: "560"
    },
    {
        id: 3,
        name: "House Cleaning",
        category: "Home Services",
        rate: "430"
    },
    {
        id: 4,
        name: "Gardening",
        category: "Handyman Services",
        rate: "315"
    },
    {
        id: 5,
        name: "Carpentry",
        category: "Home Services",
        rate: "290"
    },
    {
        id: 6,
        name: "Pest Control",
        category: "Home Services",
        rate: "365"
    },
    {
        id: 7,
        name: "Painting Services",
        category: "Home Services",
        rate: "425"
    },
    {
        id: 8,
        name: "Appliance Repair",
        category: "Home Services",
        rate: "265"
    },
    {
        id: 9,
        name: "Car Wash",
        category: "Handyman Services",
        rate: "370"
    },
    {
        id: 10,
        name: "Babysitting",
        category: "Personal Assistance",
        rate: "150"
    },
    {
        id: 11,
        name: "Dog Walking",
        category: "Personal Assistance",
        rate: "175"
    },
    {
        id: 12,
        name: "Home Renovation",
        category: "Home Services",
        rate: "170"
    },
    {
        id: 13,
        name: "Event Planning",
        category: "Personal Assistance",
        rate: "315"
    },
    {
        id: 14,
        name: "Fitness Training",
        category: "Beauty & Wellness",
        rate: "500"
    },
    {
        id: 15,
        name: "Computer Repair",
        category: "Handyman Services",
        rate: "470"
    },
    {
        id: 16,
        name: "Photography",
        category: "Personal Assistance",
        rate: "400"
    },
    {
        id: 17,
        name: "Yoga Classes",
        category: "Beauty & Wellness",
        rate: "365"
    },
    {
        id: 18,
        name: "Mobile Repair",
        category: "Handyman Services",
        rate: "120"
    },
    {
        id: 19,
        name: "Interior Design",
        category: "Handyman Services",
        rate: "530"
    },
    {
        id: 20,
        name: "Pet Grooming Services",
        category: "Personal Assistance",
        rate: "460"
    },
    {
        id: 21,
        name: "Food Delivery",
        category: "Delivery Services",
        rate: "150"
    },
    {
        id: 22,
        name: "Parcel Delivery",
        category: "Delivery Services",
        rate: "450"
    },
    {
        id: 23,
        name: "Furniture Moving",
        category: "Delivery Services",
        rate: "410"
    },
    {
        id: 24,
        name: "Document Courier",
        category: "Delivery Services",
        rate: "515"
    },
    {
        id: 25,
        name: "Grocery Delivery",
        category: "Delivery Services",
        rate: "350"
    },
    {
        id: 26,
        name: "Medicine Delivery",
        category: "Delivery Services",
        rate: "420"
    },
    {
        id: 27,
        name: "Gift Delivery",
        category: "Delivery Services",
        rate: "120"
    },
    {
        id: 28,
        name: "E-commerce Package Delivery",
        category: "Delivery Services",
        rate: "300"
    },
    {
        id: 29,
        name: "TV Mounting",
        category: "Handyman Services",
        rate: "430"
    },
    {
        id: 30,
        name: "Furniture Assembly",
        category: "Handyman Services",
        rate: "260"
    },
    {
        id: 31,
        name: "Appliance Installation",
        category: "Handyman Services",
        rate: "245"
    },
    {
        id: 32,
        name: "Door Repair",
        category: "Handyman Services",
        rate: "595"
    },
    {
        id: 33,
        name: "Window Repair",
        category: "Handyman Services",
        rate: "345"
    },
    {
        id: 34,
        name: "Faucet Installation",
        category: "Handyman Services",
        rate: "110"
    },
    {
        id: 35,
        name: "Ceiling Fan Installation",
        category: "Handyman Services",
        rate: "225"
    },
    {
        id: 36,
        name: "Cabinet Installation",
        category: "Handyman Services",
        rate: "450"
    },
    {
        id: 37,
        name: "Errands",
        category: "Personal Assistance",
        rate: "380"
    },
    {
        id: 38,
        name: "Grocery Shopping",
        category: "Personal Assistance",
        rate: "275"
    },
    {
        id: 39,
        name: "Pet Sitting",
        category: "Personal Assistance",
        rate: "570"
    },
    {
        id: 40,
        name: "Event Planning",
        category: "Personal Assistance",
        rate: "270"
    },
    {
        id: 41,
        name: "Travel Arrangements",
        category: "Personal Assistance",
        rate: "255"
    },
    {
        id: 42,
        name: "Personal Shopping",
        category: "Personal Assistance",
        rate: "315"
    },
    {
        id: 43,
        name: "Virtual Assistant",
        category: "Personal Assistance",
        rate: "270"
    },
    {
        id: 44,
        name: "Laundry Services",
        category: "Personal Assistance",
        rate: "255"
    },
    {
        id: 45,
        name: "Haircuts & Styling",
        category: "Beauty & Wellness",
        rate: "345"
    },
    {
        id: 46,
        name: "Facial Treatments",
        category: "Beauty & Wellness",
        rate: "365"
    },
    {
        id: 47,
        name: "Massage Therapy",
        category: "Beauty & Wellness",
        rate: "390"
    },
    {
        id: 48,
        name: "Nail Services",
        category: "Beauty & Wellness",
        rate: "260"
    },
    {
        id: 49,
        name: "Makeup Services",
        category: "Beauty & Wellness",
        rate: "510"
    },
    {
        id: 50,
        name: "Yoga Instruction",
        category: "Beauty & Wellness",
        rate: "185"
    },
    {
        id: 51,
        name: "Personal Training",
        category: "Beauty & Wellness",
        rate: "545"
    },
    {
        id: 52,
        name: "Skin Care Treatments",
        category: "Beauty & Wellness",
        rate: "530"
    }
];

const TaskerSignupStepTwo = ({ formData, handleChange, nextStep, prevStep }) => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [serviceOptions, setServiceOptions] = useState([]);

    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        setSelectedCategory(selected);

        // Filter services based on selected category
        const filteredServices = Service.filter((service) => service.category === selected);
        setServiceOptions(filteredServices);
    };

    // Add a service to the formData
    const addService = (service) => {
        if (!service) return;
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

    // Update service options when category changes
    useEffect(() => {
        if (selectedCategory) {
            const filteredServices = Service.filter((service) => service.category === selectedCategory);
            setServiceOptions(filteredServices);
        }
    }, [selectedCategory]);

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

                    {/* Category Dropdown */}
                    <div className="mb-3">
                        <label
                            htmlFor="category"
                            className="form-label"
                            style={{
                                fontWeight: "500",
                                color: "#5a6b81",
                            }}
                        >
                            Select Category
                        </label>
                        <select
                            className="form-select"
                            id="category"
                            name="category"
                            defaultValue=""
                            onChange={handleCategoryChange}
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                padding: "10px",
                            }}
                        >
                            <option value="" disabled>
                                Choose a category
                            </option>
                            {Category.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Service Dropdown */}
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
                            defaultValue=""
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
                                <option key={service.id} value={service.name}>
                                    {service.name} - ₹{service.rate}
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
                                        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <span style={{ fontSize: "1rem", fontWeight: "500" }}>
                                        ₹{service.rate}
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
                                        <i className="bi bi-x-lg" style={{ fontSize: "1rem" }}></i>
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
