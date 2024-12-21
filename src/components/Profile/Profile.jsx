import React, { useState, useEffect } from "react";
import { Card, ListGroup, Row, Col, Button, Modal } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { useCookies } from "react-cookie"; // Import react-cookie
import EditProfile from "./EditProfile"; // Import EditProfile component
import ProfilePicture from "../../assets/Profile.jpg"; // Keep the profile picture as is
import axios from "axios"; // Import axios for API requests

const Profile = () => {
    const [cookies] = useCookies(["token"]); // Get the token from cookies
    const [profileData, setProfileData] = useState(null); // Store profile data
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    // Fetch profile data from backend
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/profile/get-profile", {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`, // Attach the token in the header
                    },
                });
                setProfileData(response.data.data); // Set the fetched data to state
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfile();
    }, [cookies.token]);

    const handleEditClick = () => {
        setIsModalOpen(true); // Open the modal when user clicks edit
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    if (!profileData) {
        return <div>Loading...</div>; // Show loading message until profile data is fetched
    }

    return (
        <div className="d-flex justify-content-center align-items-center m-5">
            <Card
                style={{
                    width: "70%",
                    borderRadius: "15px",
                    padding: "20px",
                }}
                className="shadow"
            >
                {/* Profile Header Section */}
                <div
                    className="d-flex justify-content-between align-items-center mb-4"
                    style={{
                        borderBottom: "2px solid #2C3E50",
                        paddingBottom: "10px",
                    }}
                >
                    <h2
                        style={{
                            fontWeight: "bold",
                            color: "#2C3E50",
                            marginBottom: "0",
                            fontSize: "2rem",
                        }}
                    >
                        Profile
                    </h2>
                    <Button
                        variant="outline-primary"
                        style={{
                            fontSize: "0.9rem",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                        }}
                        onClick={handleEditClick} // Trigger the modal on click
                    >
                        <FiEdit style={{ marginRight: "5px" }} /> Edit Profile
                    </Button>
                </div>

                <Card.Body>
                    <Row>
                        {/* Profile Picture */}
                        <Col
                            md={4}
                            className="d-flex justify-content-center align-items-center"
                        >
                            <img
                                src={ProfilePicture}
                                alt="Profile"
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "2px solid #2C3E50",
                                }}
                            />
                        </Col>

                        {/* Personal Information */}
                        <Col md={8} className="d-flex flex-column justify-content-center">
                            <h3
                                style={{
                                    fontSize: "1.8rem",
                                    fontWeight: "bold",
                                    color: "#2C3E50",
                                    marginBottom: "10px",
                                }}
                            >
                                {profileData.firstName} {profileData.lastName}
                            </h3>
                            <p style={{ fontSize: "1rem", margin: "5px 0", color: "#555" }}>
                                <strong>Email:</strong> {profileData.email}
                            </p>
                            <p style={{ fontSize: "1rem", margin: "5px 0", color: "#555" }}>
                                <strong>Phone:</strong> {profileData.phone}
                            </p>
                            <p style={{ fontSize: "1rem", margin: "5px 0", color: "#555" }}>
                                <strong>Area:</strong> {profileData.area}
                            </p>
                            <p style={{ fontSize: "1rem", margin: "5px 0", color: "#555" }}>
                                <strong>Role:</strong> {profileData.role}
                            </p>
                        </Col>
                    </Row>

                    {/* Services Section */}
                    {profileData.role !== "user" && (
                        <>
                            <h4
                                className="mt-4"
                                style={{
                                    fontWeight: "bold",
                                    color: "#2C3E50",
                                    borderBottom: "2px solid #2C3E50",
                                    paddingBottom: "5px",
                                    display: "inline-block",
                                }}
                            >
                                Services
                            </h4>
                            <ListGroup className="mt-3">
                                {profileData.services.map((service, index) => (
                                    <ListGroup.Item
                                        key={index}
                                        className="d-flex justify-content-between align-items-center"
                                        style={{
                                            fontSize: "1rem",
                                            color: "#333",
                                            padding: "10px 15px",
                                        }}
                                    >
                                        <span>{service.name}</span>
                                        <span style={{ fontWeight: "bold" }}>₹{service.rate}</span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </>
                    )}
                </Card.Body>
            </Card>

            {/* Modal for Editing Profile */}
            <Modal show={isModalOpen} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditProfile
                        profileData={profileData}
                        setProfileData={setProfileData}
                        setIsModalOpen={setIsModalOpen}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Profile;
