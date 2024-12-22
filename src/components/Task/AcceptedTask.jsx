import React, { useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";

const dummyAcceptedRequests = [
    {
        _id: "1",
        taskName: "Fix Leaky Faucet",
        taskCategory: "Plumbing",
        taskPrice: "$50",
        timeSlot: "10:00 AM - 12:00 PM",
        date: "2024-12-25",
        area: "Downtown",
        address: "123 Main Street",
        status: "accepted",
        taskImage: "https://via.placeholder.com/150"
    },
    {
        _id: "2",
        taskName: "Assemble Furniture",
        taskCategory: "Carpentry",
        taskPrice: "$75",
        timeSlot: "2:00 PM - 4:00 PM",
        date: "2024-12-26",
        area: "Midtown",
        address: "456 Center Ave",
        status: "accepted",
        taskImage: "https://via.placeholder.com/150"
    },
    {
        _id: "3",
        taskName: "Garden Maintenance",
        taskCategory: "Gardening",
        taskPrice: "$60",
        timeSlot: "9:00 AM - 11:00 AM",
        date: "2024-12-27",
        area: "Westside",
        address: "789 West Road",
        status: "accepted",
        taskImage: "https://via.placeholder.com/150"
    }
];

const AcceptedTask = () => {
    const [acceptedRequests, setAcceptedRequests] = useState(dummyAcceptedRequests);
    const [cookies] = useCookies(["token", "role"]);

    const role = cookies.role;
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
                            delay: index * 0.1
                        }}
                    >
                        <Card className="h-100 shadow-sm border-0 position-relative">
                            <Card.Img
                                variant="top"
                                src={request.taskImage}
                                alt={request.taskName}
                                style={{
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "10px 10px 0 0"
                                }}
                            />
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
                                    textTransform: "capitalize"
                                }}
                            >
                                {request.status}
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title
                                    className="mb-3"
                                    style={{ color: "#4f5051", fontWeight: "600", fontSize: "1.25rem" }}
                                >
                                    {request.taskName}
                                </Card.Title>
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
                                <div className="d-flex justify-content-between mt-auto">
                                    <a
                                        href="#"
                                        className="btn btn-primary"
                                        style={{
                                            borderRadius: "20px",
                                            padding: "10px 20px",
                                            fontSize: "15px",
                                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                            textDecoration: "none",
                                            transition: "all 0.3s ease-in-out"
                                        }}
                                    >
                                        View Request
                                    </a>
                                    {role === "tasker" && (
                                        <>
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
                                                Mark Complete
                                            </a>
                                            <a
                                                href="#"
                                                className="btn btn-secondary"
                                                style={{
                                                    borderRadius: "20px",
                                                    padding: "10px 20px",
                                                    fontSize: "15px",
                                                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                                    textDecoration: "none",
                                                    transition: "all 0.3s ease-in-out"
                                                }}
                                            >
                                                Cancel
                                            </a>
                                        </>
                                    )}

                                </div>
                            </Card.Body>
                        </Card>
                    </motion.div>
                ))}
            </Row>
        </Container>
    );
};

export default AcceptedTask;
