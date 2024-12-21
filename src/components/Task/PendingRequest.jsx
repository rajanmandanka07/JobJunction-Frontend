import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Card, Row, Container, Spinner, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";

const PendingRequest = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cookies] = useCookies(["token", "role"]);

    const role = cookies.role;
    const token = cookies.token;

    useEffect(() => {
        // Fetch pending requests from the backend
        const fetchPendingRequests = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/task/pending-requests", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setPendingRequests(response.data.data);
            } catch (err) {
                setError("Failed to fetch pending requests. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPendingRequests();
    }, [token]);

    return (
        <Container style={{padding: "20px"}}>
            {/* Heading */}
            <div className="text-center mb-4">
                {role === "tasker" ? (
                    // Tasker Perspective
                    <>
                        <h2 className="fw-bold" style={{fontSize: "2.5rem", color: "#3c5365"}}>
                            Assigned <span style={{color: "#456fca"}}>Tasks</span>
                        </h2>
                        <p className="text-muted" style={{maxWidth: "600px", margin: "0 auto"}}>
                            View all the tasks assigned to you that are pending acceptance or completion.
                        </p>
                    </>
                ) : (
                    // User Perspective
                    <>
                        <h2 className="fw-bold" style={{fontSize: "2.5rem", color: "#3c5365"}}>
                            Pending <span style={{color: "#456fca"}}>Requests</span>
                        </h2>
                        <p className="text-muted" style={{maxWidth: "600px", margin: "0 auto"}}>
                            View all your pending service requests that are yet to be accepted by a tasker.
                        </p>
                    </>
                )}
            </div>

            {/* Loading or Error State */}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary"/>
                    <p className="text-muted mt-3">Loading pending requests...</p>
                </div>
            ) : error ? (
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            ) : (
                /* Pending Requests List */
                <>
                    {pendingRequests.length > 0 ? (
                        <Row className="g-4">
                            {pendingRequests.map((request, index) => (
                                <motion.div
                                    className="col-lg-4 col-md-6"
                                    key={request._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeOut",
                                        delay: index * 0.1, // Staggered animation
                                    }}
                                >
                                    <Card className="h-100 shadow-sm border-0 position-relative">
                                        {/* Image or Placeholder */}
                                        <Card.Img
                                            variant="top"
                                            src={request.taskImage || "https://via.placeholder.com/150"}
                                            alt={request.taskName}
                                            style={{
                                                height: "200px",
                                                objectFit: "cover",
                                                borderRadius: "10px 10px 0 0",
                                            }}
                                        />

                                        {/* Status Badge */}
                                        <div
                                            className="position-absolute"
                                            style={{
                                                top: "15px",
                                                right: "15px",
                                                backgroundColor: "rgba(248, 249, 250, 0.8)",
                                                color: "#2b435e",
                                                fontWeight: "600",
                                                fontSize: "0.9rem",
                                                padding: "6px 12px",
                                                borderRadius: "20px",
                                                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                                                textAlign: "center",
                                                textTransform: "capitalize", // Capitalize status for better readability
                                            }}
                                        >
                                            {request.status}
                                        </div>

                                        <Card.Body className="d-flex flex-column">
                                            {/* Task Name */}
                                            <Card.Title
                                                className=" mb-3"
                                                style={{ color: "#4f5051", fontWeight: "600", fontSize: "1.25rem" }}
                                            >
                                                {request.taskName}
                                            </Card.Title>

                                            {/* Task Details */}
                                            <div className="mb-4">
                                                <Card.Text>
                                                    <strong>Category:</strong> {request.taskCategory}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Price:</strong> {request.taskPrice}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Time Slot:</strong> {request.timeSlot}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Date:</strong> {new Date(request.date).toLocaleDateString()}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Area:</strong> {request.area}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Address:</strong> {request.address}
                                                </Card.Text>
                                            </div>

                                            {/* Role-Specific Action Buttons */}
                                            <div className="d-flex justify-content-between mt-auto">
                                                {/* Common View Request Button */}
                                                <a
                                                    href="#"
                                                    className="btn btn-primary"
                                                    style={{
                                                        borderRadius: "20px",
                                                        padding: "10px 20px",
                                                        fontSize: "15px",
                                                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                                        textDecoration: "none",
                                                        transition: "all 0.3s ease-in-out",
                                                    }}
                                                >
                                                    View Request
                                                </a>

                                                {/* Accept Task Button (Only for tasker) */}
                                                {role === "tasker" && (
                                                    <a
                                                        href="#"
                                                        className="btn btn-success"
                                                        style={{
                                                            borderRadius: "20px",
                                                            padding: "10px 20px",
                                                            fontSize: "15px",
                                                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                                            textDecoration: "none",
                                                            transition: "all 0.3s ease-in-out",
                                                        }}
                                                    >
                                                        Accept Task
                                                    </a>
                                                )}
                                            </div>


                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            ))}
                        </Row>
                    ) : (
                        <div className="text-center">
                            <p className="text-muted">
                                {role === "tasker"
                                    ? "No tasks available for you at the moment."
                                    : "No pending requests at the moment."}
                            </p>
                        </div>
                    )}
                </>

            )}
        </Container>
    );
};

export default PendingRequest;
