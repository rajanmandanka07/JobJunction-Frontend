import React, { useState, useEffect } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import axios from "axios";

const CanceledTask = () => {
    const [canceledRequests, setCanceledRequests] = useState([]);
    const [cookies] = useCookies(["token", "role"]);
    const role = cookies.role;

    useEffect(() => {
        const fetchCanceledTasks = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/task/canceled-task", {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                });
                setCanceledRequests(response.data.canceledTasks); // Assuming the API returns an array of tasks
            } catch (error) {
                console.error("Error fetching canceled tasks:", error);
            }
        };

        fetchCanceledTasks();
    }, [cookies.token]);

    return (
        <Container style={{ padding: "20px" }}>
            <div className="text-center mb-4">
                {role === "tasker" ? (
                    <>
                        <h2 className="fw-bold" style={{ fontSize: "2.5rem", color: "#3c5365" }}>
                            Canceled <span style={{ color: "#dc3545" }}>Tasks</span>
                        </h2>
                        <p className="text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
                            View all tasks you have canceled or were canceled by clients.
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="fw-bold" style={{ fontSize: "2.5rem", color: "#3c5365" }}>
                            Canceled <span style={{ color: "#dc3545" }}>Requests</span>
                        </h2>
                        <p className="text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
                            View all service requests you have canceled or were canceled by taskers.
                        </p>
                    </>
                )}
            </div>

            <Row className="g-4">
                {canceledRequests.map((request, index) => (
                    <motion.div
                        className="col-lg-4 col-md-6"
                        key={request._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: index * 0.1,
                        }}
                    >
                        <Card className="h-100 shadow-lg border-0 position-relative rounded" style={{ overflow: "hidden" }}>
                            {/* Task Image */}
                            <Card.Img
                                variant="top"
                                src={request.taskImage || "https://via.placeholder.com/150"}
                                alt={request.taskTitle}
                                style={{
                                    height: "200px",
                                    objectFit: "cover",
                                    transition: "transform 0.3s ease",
                                }}
                                className="rounded-top"
                                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            />

                            {/* Status Badge */}
                            <div
                                className="position-absolute shadow-sm d-flex align-items-center justify-content-center gap-2"
                                style={{
                                    top: "15px",
                                    right: "15px",
                                    backgroundColor: request.status === "canceled" ? "#f8d7da" : "rgba(255, 255, 255, 0.9)",
                                    color: request.status === "canceled" ? "#721c24" : "#2b435e",
                                    fontWeight: "600",
                                    fontSize: "0.9rem",
                                    padding: "6px 12px",
                                    borderRadius: "20px",
                                    textAlign: "center",
                                    textTransform: "capitalize",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                    border: request.status === "canceled" ? "1px solid #f5c6cb" : "none",
                                }}
                            >
                                {request.status === "canceled" && (
                                    <i className="bi bi-x-circle-fill" style={{ fontSize: "1rem" }}></i>
                                )}
                                {request.status}
                            </div>


                            {/* Card Body */}
                            <Card.Body className="d-flex flex-column px-4">
                                {/* Task Title */}
                                <Card.Title
                                    className="mb-3 text-primary"
                                    style={{
                                        fontWeight: "700",
                                        fontSize: "1.4rem",
                                    }}
                                >
                                    {request.taskTitle}
                                </Card.Title>

                                {/* Task Description */}
                                <Card.Text className="text-muted mb-3" style={{ fontSize: "0.95rem" }}>
                                    {request.taskDescription}
                                </Card.Text>

                                {/* Task Details */}
                                <ul className="list-unstyled mb-4">
                                    <li>
                                        <i className="bi bi-tag-fill text-info me-2"></i>
                                        <strong>Category:</strong> {request.taskCategory}
                                    </li>
                                    <li>
                                        <i className="bi bi-currency-rupee text-success me-2"></i>
                                        <strong>Price:</strong> {request.taskPrice}
                                    </li>
                                    <li>
                                        <i className="bi bi-clock text-warning me-2"></i>
                                        <strong>Time Slot:</strong> {request.timeSlot}
                                    </li>
                                    <li>
                                        <i className="bi bi-calendar text-danger me-2"></i>
                                        <strong>Date:</strong> {new Date(request.date).toLocaleDateString()}
                                    </li>
                                    <li>
                                        <i className="bi bi-geo-alt text-secondary me-2"></i>
                                        <strong>Area:</strong> {request.area}
                                    </li>
                                    <li>
                                        <i className="bi bi-house-door-fill text-primary me-2"></i>
                                        <strong>Address:</strong> {request.address}
                                    </li>
                                    <li>
                                        <i className="bi bi-person-badge-fill text-info me-2"></i>
                                        <strong>User ID:</strong> {request.userId}
                                    </li>
                                    <li>
                                        <i className="bi bi-person-badge-fill text-info me-2"></i>
                                        <strong>Tasker ID:</strong> {request.taskerId}
                                    </li>
                                    <li>
                                        <i className="bi bi-shield-fill text-danger text-info me-2"></i>
                                        <strong>canceledBy: </strong> {request.canceledBy}
                                    </li>
                                    <li>
                                        <i className="bi bi-person-fill text-success text-info me-2"></i>
                                        <strong>Reason: </strong> {request.reason}
                                    </li>
                                    <li>
                                        <i className="bi bi-calendar-check-fill text-secondary me-2"></i>
                                        <strong>Created At:</strong> {new Date(request.createdAt).toLocaleString()}
                                    </li>
                                    <li>
                                        <i className="bi bi-pencil-square text-primary me-2"></i>
                                        <strong>Updated At:</strong> {new Date(request.updatedAt).toLocaleString()}
                                    </li>
                                </ul>

                                {/* Buttons Section */}
                                <div className="d-flex justify-content-between align-items-center mt-auto gap-2">
                                    <a
                                        href="#"
                                        className="btn btn-primary w-100"
                                        style={{
                                            borderRadius: "10px",
                                            padding: "10px 20px",
                                            fontSize: "15px",
                                        }}
                                    >
                                        View Details
                                    </a>
                                </div>
                            </Card.Body>
                        </Card>

                    </motion.div>
                ))}
            </Row>
        </Container>
    );
};

export default CanceledTask;
