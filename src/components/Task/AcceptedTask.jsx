import React, { useEffect, useState } from "react";
import { Container, Row, Card, Modal, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import axios from "axios";

const AcceptedTask = () => {
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [cookies] = useCookies(["token", "role"]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState("");
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const role = cookies.role;
    const token = cookies.token; // Token from cookies

    useEffect(() => {
        const fetchAcceptedTasks = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/task/accepted-task", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAcceptedRequests(response.data.acceptedTasks || []); // Adjust based on API response structure
                setLoading(false);
            } catch (err) {
                console.error("Error fetching accepted tasks:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAcceptedTasks();
    }, [token]);

    const handleMarkComplete = async (taskId) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/task/complete-task",
                { _id: taskId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Task marked as complete:", response.data);

            // Remove the completed task from the list
            setAcceptedRequests((prevRequests) =>
                prevRequests.filter((request) => request._id !== taskId)
            );
        } catch (err) {
            console.error("Error marking task as complete:", err);
            alert("Failed to mark task as complete. Please try again.");
        }
    };

    const handleCancelTask = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/task/cancel-task",
                { _id: selectedTaskId, reason: cancelReason },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Task cancelled successfully:", response.data);

            // Remove the cancelled task from the list
            setAcceptedRequests((prevRequests) =>
                prevRequests.filter((request) => request._id !== selectedTaskId)
            );
            setShowCancelModal(false);
            setCancelReason("");
        } catch (err) {
            console.error("Error cancelling task:", err);
            alert("Failed to cancel task. Please try again.");
        }
    };

    const openCancelModal = (taskId) => {
        setSelectedTaskId(taskId);
        setShowCancelModal(true);
    };

    const closeCancelModal = () => {
        setShowCancelModal(false);
        setCancelReason("");
    };

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container style={{ padding: "20px" }}>
            <div className="text-center mb-4">
                {role === "tasker" ? (
                    <>
                        <h2 className="fw-bold" style={{ fontSize: "2.5rem", color: "#3c5365" }}>
                            Accepted <span style={{ color: "#456fca" }}>Tasks</span>
                        </h2>
                        <p className="text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
                            View all the tasks you have accepted and are currently working on.
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="fw-bold" style={{ fontSize: "2.5rem", color: "#3c5365" }}>
                            Accepted <span style={{ color: "#456fca" }}>Requests</span>
                        </h2>
                        <p className="text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
                            View all your service requests that have been accepted by a tasker.
                        </p>
                    </>
                )}
            </div>

            <Row className="g-4">
                {acceptedRequests.map((request, index) => (
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
                                    backgroundColor: request.status === "accepted" ? "#d1ecf1" : "rgba(255, 255, 255, 0.9)",
                                    color: request.status === "accepted" ? "#0c5460" : "#2b435e",
                                    fontWeight: "600",
                                    fontSize: "0.9rem",
                                    padding: "6px 12px",
                                    borderRadius: "20px",
                                    textAlign: "center",
                                    textTransform: "capitalize",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                    border: request.status === "accepted" ? "1px solid #bee5eb" : "none",
                                }}
                            >
                                {request.status === "accepted" && (
                                    <i className="bi bi-hand-thumbs-up-fill" style={{ fontSize: "1rem" }}></i>
                                )}
                                {request.status}
                            </div>


                            {/* Card Body */}
                            <Card.Body className="d-flex flex-column px-4">
                                {/* Task Title */}
                                <Card.Title
                                    className="mb-2 text-primary"
                                    style={{fontWeight: "700", fontSize: "1.3rem"}}
                                >
                                    {request.taskTitle}
                                </Card.Title>

                                {/* Task Description */}
                                <Card.Text className="text-muted mb-4" style={{fontSize: "0.9rem"}}>
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
                                        <strong>User ID:</strong> {request.userId || "N/A"}
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
                                        <strong>Task ID:</strong> {request._id || "N/A"}
                                    </li>
                                </ul>

                                <div className="d-flex justify-content-between align-items-center mt-auto gap-2">
                                    {/* View Request Button */}
                                    <a
                                        href="#"
                                        className="btn btn-primary w-100"
                                        style={{
                                            borderRadius: "10px",
                                            padding: "10px 10px",
                                            fontSize: "15px",
                                        }}
                                    >
                                        View Request
                                    </a>

                                    {/* Mark Complete Button for Tasker Role */}
                                    {role === "tasker" && (
                                        <button
                                            onClick={() => handleMarkComplete(request._id)}
                                            className="btn btn-outline-success w-100"
                                            style={{
                                                borderRadius: "10px",
                                                padding: "10px 10px",
                                                fontSize: "15px",
                                            }}
                                        >
                                            Mark Complete
                                        </button>
                                    )}

                                    {/* Cancel Button */}
                                    <button
                                        onClick={() => openCancelModal(request._id)}
                                        className="btn btn-outline-danger "
                                        style={{
                                            borderRadius: "10px",
                                            padding: "10px 10px",
                                            fontSize: "15px",
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </Card.Body>
                        </Card>

                    </motion.div>
                ))}
            </Row>

            <Modal show={showCancelModal} onHide={closeCancelModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Reason for cancellation:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                placeholder="Enter your reason for cancelling the task"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCancelModal}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleCancelTask}>
                        Cancel Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AcceptedTask;
