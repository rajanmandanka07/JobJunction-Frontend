import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
import UserSignup from "./components/User/UserSignup.jsx";
import TaskerSignup from "./components/Tasker/TaskerSignup.jsx";
import AvailableServices from "./components/AvailableServices/AvailableServices.jsx";
import Profile from "./components/Profile/Profile.jsx";
import loader from "./assets/three-dots.svg";
import UserRouterProtection from "./components/Router Protection/UserRouterProtection.jsx";
import BookTasker from "./components/Task/BookTask/BookTasker.jsx";
import PendingRequest from "./components/Task/PendingRequest.jsx";
import AcceptedRequest from "./components/Task/AcceptedRequest.jsx";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set timeout to simulate page loading (e.g., for data fetching or API calls)
        const timer = setTimeout(() => {
            setLoading(false); // Hide the loader after 2 seconds
        }, 100);

        return () => clearTimeout(timer); // Cleanup timer when component is unmounted
    }, []);

    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                {loading ? (
                    // Loader shown when loading is true
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="loader-container">
                            <img
                                src={loader}
                                width="60"
                                alt="Loading..."
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <Navbar/>

                        {/* Main content area */}
                        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                            <div className="container text-center">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/user-signup" element={<UserSignup />} />
                                    <Route path="/tasker-signup" element={<TaskerSignup />} />
                                    <Route path="/profile" element={<UserRouterProtection element={<Profile />} />} />
                                    <Route path="/book-tasker" element={<UserRouterProtection element={<BookTasker />} />} />
                                    <Route path="/available-services" element={<AvailableServices />} />
                                    <Route path="/pending-request" element={<UserRouterProtection element={<PendingRequest/>} />} />
                                    <Route path="/accepted-request" element={<UserRouterProtection element={<AcceptedRequest/>} />} />

                                    {/* Redirect to login page if no route is found */}
                                    <Route path="*" element={<Login />} />
                                </Routes>
                            </div>
                        </div>

                        {/* Footer */}
                        <Footer />
                    </>
                )}
            </div>
        </Router>
    );
}

export default App;
