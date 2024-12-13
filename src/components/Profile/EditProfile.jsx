import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import {useCookies} from "react-cookie";

const EditProfile = ({ profileData, setProfileData, setIsModalOpen }) => {
    const [formData, setFormData] = useState(profileData);
    const [cookies] = useCookies(["token"]);

    const serviceOptions = [
        { name: "Web Development", rate: 50 },
        { name: "Graphic Design", rate: 40 },
        { name: "SEO Services", rate: 60 },
    ];

    useEffect(() => {
        setFormData(profileData); // Sync the profile data when it changes
    }, [profileData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Add a service to the selected services list
    const addService = (service) => {
        setFormData({
            ...formData,
            services: [...formData.services, service], // Add the selected service
        });
    };

    // Remove a service from the selected services list
    const removeService = (serviceName) => {
        setFormData({
            ...formData,
            services: formData.services.filter((service) => service.name !== serviceName),
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make the PUT request to update the profile
            const response = await axios.put('http://localhost:5000/api/profile/update', formData, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`, // Attach the token in the header
                },
            });
            console.log('Profile updated successfully:', response.data);

            // Update the profile data in parent component
            setProfileData(formData);
            setIsModalOpen(false); // Close the modal after successful update
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <Container>
            <Card className="p-4 shadow-sm" style={{ borderRadius: "10px" }}>
                <Card.Body>
                    <h3 className="text-center mb-4" style={{ color: "#2C3E50", fontWeight: "bold" }}>
                        Edit Profile
                    </h3>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="firstName" className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <FaUser style={{ marginRight: "10px", color: "#2C3E50" }} />
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your first name"
                                            style={{ borderRadius: "30px" }}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="lastName" className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <FaUser style={{ marginRight: "10px", color: "#2C3E50" }} />
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your last name"
                                            style={{ borderRadius: "30px" }}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <div className="d-flex align-items-center">
                                <FaEnvelope style={{ marginRight: "10px", color: "#2C3E50" }} />
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email address"
                                    style={{ borderRadius: "30px" }}
                                    disabled
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="phone" className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <div className="d-flex align-items-center">
                                <FaPhone style={{ marginRight: "10px", color: "#2C3E50" }} />
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    style={{ borderRadius: "30px" }}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="area" className="mb-3">
                            <Form.Label>Area</Form.Label>
                            <div className="d-flex align-items-center">
                                <FaMapMarkerAlt style={{ marginRight: "10px", color: "#2C3E50" }} />
                                <Form.Control
                                    as="select"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleInputChange}
                                    style={{
                                        borderRadius: "30px",
                                        border: "1px solid #d1d5db",
                                        padding: "10px",
                                    }}
                                >
                                    <option value="" disabled>Choose your area</option>
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
                                </Form.Control>
                            </div>
                        </Form.Group>

                        {/* Add services section if not a user */}
                        {profileData.role !== "user" && (
                            <>
                                {/* Service Selection */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="services"
                                        className="form-label"
                                        style={{
                                            fontWeight: "500",
                                            color: "#2C3E50",
                                        }}
                                    >
                                        Select Service
                                    </label>
                                    <select
                                        className="form-select"
                                        id="services"
                                        name="services"
                                        onChange={(e) =>
                                            addService(
                                                serviceOptions.find((service) => service.name === e.target.value)
                                            )
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

                                {/* Line to separate sections */}
                                <hr style={{ borderColor: "#2C3E50", margin: "20px 0" }} />
                                {/* Selected Services and Rates */}
                                {formData.services.length > 0 && (
                                    <div className="mb-3">
                                        <label
                                            className="form-label"
                                            style={{
                                                fontWeight: "500",
                                                color: "#2C3E50",
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
                                                            ${service.rate}/hr
                                                        </span>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger"
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
                            </>
                        )}

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                            style={{
                                fontSize: "1.1rem",
                                fontWeight: "bold",
                                padding: "12px",
                                borderRadius: "30px",
                            }}
                        >
                            Save Changes
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditProfile;
