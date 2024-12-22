import React, { useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";

const dummyCompletedTasks = [
    {
        _id: "1",
        taskName: "Fix Leaky Faucet",
        taskCategory: "Plumbing",
        taskPrice: "$50",
        completionDate: "2024-12-10",
        area: "Downtown",
        address: "123 Main Street",
        taskImage: "https://via.placeholder.com/150"
    },
    {
        _id: "2",
        taskName: "Assemble Furniture",
        taskCategory: "Carpentry",
        taskPrice: "$75",
        completionDate: "2024-12-12",
        area: "Midtown",
        address: "456 Center Ave",
        taskImage: "https://via.placeholder.com/150"
    },
    {
        _id: "3",
        taskName: "Garden Maintenance",
        taskCategory: "Gardening",
        taskPrice: "$60",
        completionDate: "2024-12-15",
        area: "Westside",
        address: "789 West Road",
        taskImage: "https://via.placeholder.com/150"
    }
];

const CompletedTask = () => {
    const [completedTasks] = useState(dummyCompletedTasks);
    const [cookies] = useCookies(["role"]);

    const role = cookies.role;
    return (
        <Container style={{padding: "20px"}}>
            <div className="text-center mb-4">
                {role === "tasker" ? (
                    <>
                        <h2 className="fw-bold" style={{fontSize: "2.5rem", color: "#3c5365"}}>
                            Completed <span style={{color: "#28a745"}}>Tasks</span>
                        </h2>
                        <p className="text-muted" style={{maxWidth: "600px", margin: "0 auto"}}>
                            View all tasks you have successfully completed for clients.
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="fw-bold" style={{fontSize: "2.5rem", color: "#3c5365"}}>
                            Completed <span style={{color: "#28a745"}}>Requests</span>
                        </h2>
                        <p className="text-muted" style={{maxWidth: "600px", margin: "0 auto"}}>
                            View all service requests successfully completed by taskers.
                        </p>
                    </>
                )}
            </div>


            <Row className="g-4">
                {completedTasks.map((task, index) => (
                    <motion.div
                        className="col-lg-4 col-md-6"
                        key={task._id}
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: index * 0.1
                        }}
                    >
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Img
                                variant="top"
                                src={task.taskImage}
                                alt={task.taskName}
                                style={{
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "10px 10px 0 0"
                                }}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title
                                    className="mb-3"
                                    style={{color: "#4f5051", fontWeight: "600", fontSize: "1.25rem"}}
                                >
                                    {task.taskName}
                                </Card.Title>
                                <div className="mb-4">
                                    <Card.Text>
                                        <strong>Category:</strong> {task.taskCategory}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Price:</strong> {task.taskPrice}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Completion Date:</strong>{" "}
                                        {new Date(task.completionDate).toLocaleDateString()}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Area:</strong> {task.area}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Address:</strong> {task.address}
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
                                        View Details
                                    </a>
                                    {role === "user" && (
                                        <a
                                            href="#"
                                            className="btn btn-warning"
                                            style={{
                                                borderRadius: "20px",
                                                padding: "10px 20px",
                                                fontSize: "15px",
                                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                                textDecoration: "none",
                                                transition: "all 0.3s ease-in-out"
                                            }}
                                        >
                                            Leave Feedback
                                        </a>
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

export default CompletedTask;
