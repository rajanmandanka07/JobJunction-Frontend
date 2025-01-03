import { useState, useEffect } from "react";
import { Container, Row, Card, Spinner, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import axios from "axios";

const CompletedTask = () => {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cookies] = useCookies(["token","role"]);

    const role = cookies.role;
    const token = cookies.token;

    useEffect(() => {
        const fetchCompletedTasks = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/task/completed-task", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCompletedTasks(response.data.completedTasks); // Ensure your API returns the correct data format
                setLoading(false);
            } catch (err) {
                setError("Failed to load completed tasks.");
                setLoading(false);
            }
        };

        fetchCompletedTasks();
    }, []);

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading completed tasks...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center py-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container style={{ padding: "20px" }}>
            <div className="text-center mb-4">
                {role === "tasker" ? (
                    <>
                        <h2 className="fw-bold" style={{ fontSize: "2.5rem", color: "#3c5365" }}>
                            Completed <span style={{ color: "#28a745" }}>Tasks</span>
                        </h2>
                        <p className="text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
                            View all tasks you have successfully completed for clients.
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="fw-bold" style={{ fontSize: "2.5rem", color: "#3c5365" }}>
                            Completed <span style={{ color: "#28a745" }}>Requests</span>
                        </h2>
                        <p className="text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
                            View all service requests successfully completed by taskers.
                        </p>
                    </>
                )}
            </div>
            {completedTasks.length > 0 ? (
                <Row className="g-4">
                    {completedTasks.map((task, index) => (
                        <motion.div
                            className="col-lg-4 col-md-6"
                            key={task._id}
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
                                    src={task.taskImage || "https://via.placeholder.com/150"}
                                    alt={task.taskTitle}
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
                                        backgroundColor: task.status === "completed" ? "#d4edda" : "rgba(255, 255, 255, 0.9)",
                                        color: task.status === "completed" ? "#155724" : "#2b435e",
                                        fontWeight: "600",
                                        fontSize: "0.9rem",
                                        padding: "6px 12px",
                                        borderRadius: "20px",
                                        textAlign: "center",
                                        textTransform: "capitalize",
                                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                        border: task.status === "completed" ? "1px solid #c3e6cb" : "none",
                                    }}
                                >
                                    {task.status === "completed" && (
                                        <i className="bi bi-check-circle-fill" style={{ fontSize: "1rem" }}></i>
                                    )}
                                    {task.status}
                                </div>


                                {/* Card Body */}
                                <Card.Body className="d-flex flex-column px-4">
                                    {/* Task Title */}
                                    <Card.Title
                                        className="mb-2 text-primary"
                                        style={{ fontWeight: "700", fontSize: "1.3rem" }}
                                    >
                                        {task.taskTitle}
                                    </Card.Title>

                                    {/* Task Description */}
                                    <Card.Text className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>
                                        {task.taskDescription}
                                    </Card.Text>

                                    {/* Task Details */}
                                    <ul className="list-unstyled mb-4">
                                        <li>
                                            <i className="bi bi-tag-fill text-info me-2"></i>
                                            <strong>Category:</strong> {task.taskCategory}
                                        </li>
                                        <li>
                                            <i className="bi bi-currency-rupee text-success me-2"></i>
                                            <strong>Price:</strong> {task.taskPrice}
                                        </li>
                                        <li>
                                            <i className="bi bi-person-fill text-warning me-2"></i>
                                            <strong>User Description:</strong> {task.userDescription}
                                        </li>
                                        <li>
                                            <i className="bi bi-clock text-warning me-2"></i>
                                            <strong>Time Slot:</strong> {task.timeSlot}
                                        </li>
                                        <li>
                                            <i className="bi bi-calendar text-danger me-2"></i>
                                            <strong>Date:</strong> {new Date(task.date).toLocaleDateString()}
                                        </li>
                                        <li>
                                            <i className="bi bi-geo-alt text-secondary me-2"></i>
                                            <strong>Area:</strong> {task.area}
                                        </li>
                                        <li>
                                            <i className="bi bi-house-door-fill text-primary me-2"></i>
                                            <strong>Address:</strong> {task.address}
                                        </li>
                                        <li>
                                            <i className="bi bi-calendar-check-fill text-secondary me-2"></i>
                                            <strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}
                                        </li>
                                        <li>
                                            <i className="bi bi-pencil-square text-primary me-2"></i>
                                            <strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}
                                        </li>
                                        <li>
                                            <i className="bi bi-person-badge-fill text-info me-2"></i>
                                            <strong>User ID:</strong> {task.userId}
                                        </li>
                                        <li>
                                            <i className="bi bi-person-badge-fill text-info me-2"></i>
                                            <strong>Tasker ID:</strong> {task.taskerId}
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
            ) : (
                <div className="text-center">
                    <h5 className="text-muted">No Completed requests available.</h5>
                </div>
            )}
        </Container>
    );
};

export default CompletedTask;
