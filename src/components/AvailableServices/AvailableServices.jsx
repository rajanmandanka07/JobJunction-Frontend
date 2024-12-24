// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {Link, useLocation} from 'react-router-dom';
import axios from "axios";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import {useCookies} from "react-cookie";

// Search Component
// eslint-disable-next-line react/prop-types
const SearchServices = ({ onSearch, searchQuery }) => {
    const [query, setQuery] = useState(searchQuery);

    useEffect(() => {
        setQuery(searchQuery);
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Search for services..."
                value={query}
                onChange={handleSearchChange}
                style={{
                    padding: "10px",
                    fontSize: "1rem",
                    borderRadius: "20px",
                    border: "1px solid #ccc",
                }}
            />
        </div>
    );
};

// Pagination Component
// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                </li>
                {pages.map((page) => (
                    <li
                        key={page}
                        className={`page-item ${currentPage === page ? "active" : ""}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

// Main AvailableServices Component
const AvailableServices = () => {
    const [services, setServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [cookies] = useCookies(["role"]);
    const role = cookies.role;
    const itemsPerPage = 9;

    useEffect(() => {
        // Extract search query from the URL
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query') || '';
        setSearchQuery(query);
    }, [location.search]);

    // Fetch services from backend API
    // Fetch services from backend or session storage
    useEffect(() => {
        const fetchServices = async () => {
            const storedServices = sessionStorage.getItem("services");

            if (storedServices) {
                // Use data from sessionStorage
                setServices(JSON.parse(storedServices));
                setLoading(false);
            } else {
                try {
                    setLoading(true);
                    const response = await axios.get("http://localhost:5000/api/task/get-all-task");

                    if (response.data.success) {
                        const fetchedServices = response.data.tasks;
                        setServices(fetchedServices);

                        // Save fetched data to sessionStorage
                        sessionStorage.setItem("services", JSON.stringify(fetchedServices));
                    } else {
                        console.error("Failed to fetch services:", response.data.message);
                    }
                } catch (error) {
                    console.error("Error fetching services:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchServices();
    }, []);

    // Filter services based on search query
    const filteredServices = services.filter((service) => {
        const trimmedQuery = searchQuery.trim().toLowerCase();
        return (
            service.title.toLowerCase().includes(trimmedQuery) ||
            service.description.toLowerCase().includes(trimmedQuery) ||
            service.category.toLowerCase().includes(trimmedQuery)
        );
    });

    // Calculate pagination details
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentServices = filteredServices.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handlePageChange = (page) => {
        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scroll effect
        });

        // Introduce a small delay before changing the page (optional for better UX)
        setTimeout(() => {
            setCurrentPage(page);
        }, 300);
    };


    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-5 mb-4">
            {/* Heading */}
            <motion.div className="text-center mb-4"
                 initial={{opacity: 0, y: 30}}
                 animate={{opacity: 1, y: 0}}
                 transition={{duration: 0.3, ease: "easeOut"}}
            >
                <h2
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "600",
                        color: "#3c5365",
                        lineHeight: "1.4",
                        letterSpacing: "1px",
                    }}
                >
                    Available <span style={{color: "#456fca"}}>Services</span>
                </h2>
                <p

                    style={{
                        fontSize: "1rem",
                        color: "#6c757d",
                        lineHeight: "1.6",
                        maxWidth: "600px",
                        margin: "10px auto 0",
                    }}
                >
                    Explore our range of services tailored to meet your unique needs. Each service
                    is designed with excellence and quality to ensure your satisfaction.
                </p>
            </motion.div>

            {/* Search Component */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{
                    duration: 0.5, // Adjust the duration for a softer feel
                    ease: [0.25, 0.1, 0.25, 1], // Cubic Bezier for smooth transition
                }}
            >
                <SearchServices onSearch={setSearchQuery} searchQuery={searchQuery}/>
            </motion.div>


            {/* Service Cards */}
            <div className="row g-4 mb-4">
                {currentServices.length > 0 ? (
                    currentServices.map((service, index) => (
                        <motion.div
                            className="col-lg-4 col-md-6"
                            key={service.id}
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut",
                                delay: index * 0.1, // Staggered animation
                            }}
                        >
                            <div className="card h-100 shadow-sm border-0 position-relative">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="card-img-top"
                                    style={{
                                        height: "200px",
                                        objectFit: "cover",
                                        borderRadius: "10px 10px 0 0",
                                    }}
                                />
                                {/* Price Badge */}
                                <div
                                    className="position-absolute"
                                    style={{
                                        top: "10px",
                                        right: "10px",
                                        backgroundColor: "rgba(248, 249, 250, 0.7)",
                                        color: "#2b435e",
                                        fontWeight: "600",
                                        fontSize: "1rem",
                                        padding: "5px 15px",
                                        borderRadius: "20px",
                                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                                        textAlign: "center",
                                    }}
                                >
                                    {service.price}
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5
                                        className="card-title"
                                        style={{
                                            color: "#4f5051",
                                            fontWeight: "600",
                                            fontSize: "1.25rem",
                                        }}
                                    >
                                        {service.title}
                                    </h5>
                                    <p
                                        className="card-text mb-2"
                                        style={{
                                            color: "#5a5a5a",
                                            fontSize: "0.95rem",
                                            lineHeight: "1.5",
                                        }}
                                    >
                                        {service.description}
                                    </p>
                                    {/* Category */}
                                    <div className="card-text mb-2 d-flex justify-content-center">
                                        <p
                                            className="card-text"
                                            style={{
                                                color: "#5a5a5a",
                                                backgroundColor: "rgba(219,219,220,0.7)",
                                                textAlign: "center",
                                                fontSize: "0.90rem",
                                                padding: "5px 10px",
                                                borderRadius: "10px",
                                                fontWeight: "500",
                                                width: "fit-content",
                                            }}
                                        >
                                            <span style={{color: "#252424", fontWeight: "bold"}}>Category: </span>
                                            {service.category}
                                        </p>
                                    </div>
                                    {role === "tasker" ? (
                                        <span
                                            style={{
                                                display: "inline-block",
                                                backgroundColor: "#6c757d", // Disabled color
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "20px",
                                                padding: "10px 20px",
                                                fontSize: "15px",
                                                textDecoration: "none",
                                                textAlign: "center",
                                                cursor: "not-allowed",
                                                opacity: 0.65,
                                            }}
                                        >
                                        Book Service
                                        </span>
                                    ) : (
                                        <Link
                                            to={{
                                                pathname: "/book-tasker",
                                            }}
                                            state={{
                                                taskId: service.id,
                                                taskName: service.title,
                                                taskCategory: service.category,
                                            }}
                                            style={{
                                                display: "inline-block",
                                                backgroundColor: "#007bff",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "20px",
                                                padding: "10px 20px",
                                                fontSize: "15px",
                                                textDecoration: "none",
                                                textAlign: "center",
                                                transition: "all 0.3s ease-in-out",
                                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = "#0056b3";
                                                e.target.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.15)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = "#007bff";
                                                e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
                                            }}
                                        >
                                            Book Service
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center">No services match your search criteria.</p>
                )}
            </div>


            {/* Pagination Component */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default AvailableServices;