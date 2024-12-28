import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Card, Row, Container, Spinner, Alert, Toast } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";

const PendingRequest = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("success");
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
                console.log(response.data);
                setPendingRequests(response.data.data);
            } catch (err) {
                setError("Failed to fetch pending requests. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPendingRequests();
    }, [token]);

    const acceptTask = async (taskId) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/task/accept-task",
                { _id: taskId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            // Success handling
            setToastMessage("Task accepted successfully!");
            setToastVariant("success");
            // Remove the accepted task from the list
            setPendingRequests((prevRequests) => prevRequests.filter((request) => request._id !== taskId));
        } catch (err) {
            // Error handling
            setToastMessage("Failed to accept the task. Please try again later.");
            setToastVariant("danger");
        }
    };

    const cancelTask = async (taskId) => {
        try {
            await axios.post(
                "http://localhost:5000/api/task/cancel-task",
                { _id: taskId, reason: "This is the reason by user." },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setToastMessage("Task canceled successfully!");
            setToastVariant("success");
            // Remove the canceled task from the list
            setPendingRequests((prevRequests) => prevRequests.filter((request) => request._id !== taskId));
        } catch (err) {
            setToastMessage("Failed to cancel the task. Please try again later.");
            setToastVariant("danger");
        }
    };


    return (
        <Container style={{ padding: "20px" }}>
            {/* Heading */}
            <div className="text-center mb-4">
                {role === "tasker" ? (
                    <>
                        <h2 className="fw-bold" style={{ fontSize: "2.5rem", color: "#3c5365" }}>
                            Assigned <span style={{ color: "#456fca" }}>Tasks</span>
                        </h2>
                        <p className="text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
                            View all the tasks assigned to you that are pending acceptance or completion.
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="fw-bold" style={{ fontSize: "2.5rem", color: "#3c5365" }}>
                            Pending <span style={{ color: "#456fca" }}>Requests</span>
                        </h2>
                        <p className="text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
                            View all your pending service requests that are yet to be accepted by a tasker.
                        </p>
                    </>
                )}
            </div>

            {/* Toast for feedback */}
            {toastMessage && (
                <Toast
                    onClose={() => setToastMessage("")}
                    show={true}
                    delay={3000}
                    autohide
                    className={`text-white bg-${toastVariant} mb-4`}
                >
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            )}

            {/* Loading or Error State */}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="text-muted mt-3">Loading pending requests...</p>
                </div>
            ) : error ? (
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            ) : (
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
                                        delay: index * 0.1,
                                    }}
                                >
                                    {/*Card for request.*/}
                                    <Card className="h-100 shadow-lg border-0 position-relative rounded" style={{ overflow: "hidden" }}>
                                        {/* Task Image */}
                                        <Card.Img
                                            variant="top"
                                            src={request.taskImage || "https://via.placeholder.com/150"}
                                            alt={request.taskName}
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
                                                backgroundColor: request.status === "pending" ? "#fff3cd" : "rgba(255, 255, 255, 0.9)",
                                                color: request.status === "pending" ? "#856404" : "#2b435e",
                                                fontWeight: "600",
                                                fontSize: "0.9rem",
                                                padding: "6px 12px",
                                                borderRadius: "20px",
                                                textAlign: "center",
                                                textTransform: "capitalize",
                                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                                border: request.status === "pending" ? "1px solid #ffeeba" : "none",
                                            }}
                                        >
                                            {request.status === "pending" && (
                                                <i className="bi bi-hourglass-split" style={{ fontSize: "1rem" }}></i>
                                            )}
                                            {request.status}
                                        </div>


                                        {/* Card Body */}
                                        <Card.Body className="d-flex flex-column px-4">
                                            {/* Task Title */}
                                            <Card.Title
                                                className="mb-2 text-primary"
                                                style={{ fontWeight: "700", fontSize: "1.3rem" }}
                                            >
                                                {request.taskTitle}
                                            </Card.Title>

                                            {/* Task Description */}
                                            <Card.Text className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>
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
                                                    <i className="bi bi-person-fill text-warning me-2"></i>
                                                    <strong>User Description:</strong> {request.userDescription}
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
                                                    <i className="bi bi-calendar-check-fill text-secondary me-2"></i>
                                                    <strong>Created At:</strong> {new Date(request.createdAt).toLocaleString()}
                                                </li>
                                                <li>
                                                    <i className="bi bi-pencil-square text-primary me-2"></i>
                                                    <strong>Updated At:</strong> {new Date(request.updatedAt).toLocaleString()}
                                                </li>
                                                <li>
                                                    <i className="bi bi-code-square text-dark me-2"></i>
                                                    <strong>Task ID:</strong> {request._id}
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
                                                    View Request
                                                </a>

                                                {role === "user" && (
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        style={{
                                                            borderRadius: "10px",
                                                            padding: "10px 10px",
                                                            fontSize: "15px",
                                                        }}
                                                        onClick={() => cancelTask(request._id)}
                                                    >
                                                        Cancel
                                                    </button>
                                                )}

                                                {role === "tasker" && (
                                                    <button
                                                        className="btn btn-outline-success w-100"
                                                        style={{
                                                            borderRadius: "10px",
                                                            padding: "10px 10px",
                                                            fontSize: "15px",
                                                        }}
                                                        onClick={() => acceptTask(request._id)}
                                                    >
                                                        Accept Task
                                                    </button>
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
