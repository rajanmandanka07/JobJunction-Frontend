import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/JobJunctionAbout.jpeg";

const About = () => {
    const navigate = useNavigate();

    const handleLinkClick = (e, targetRoute, navigate) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            navigate(targetRoute);
        }, 500);
    };

    // Animation Variants
    const fadeIn = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
    };

    const popUp = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
    };

    return (
        <motion.div
            className="container my-5"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            {/* Header Section */}
            <motion.div className="text-center mb-5" variants={fadeIn}>
                <h1 className="fw-bold" style={{ color: "#2B2D42" }}>About Job Junction</h1>
                <p className="text-muted" style={{ fontSize: "1.1rem" }}>
                    Bridging the gap between clients and taskers, making life easier one task at a time.
                </p>
            </motion.div>

            {/* Who We Are Section */}
            <div className="row align-items-center mb-5">
                <motion.div
                    className="col-md-6 mb-4 mb-md-0"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <img
                        src={logo}
                        alt="About Us"
                        className="img-fluid rounded shadow-sm"
                    />
                </motion.div>
                <motion.div className="col-md-6" variants={fadeIn}>
                    <h2 className="fw-bold" style={{ color: "#2B2D42" }}>Who We Are</h2>
                    <p style={{ color: "#4A4E69", lineHeight: "1.6" }}>
                        At <strong style={{ color: "#0077B6" }}>Job Junction</strong>, we redefine the way people connect for daily tasks.
                        From handyman services to local deliveries, our platform ensures smooth and efficient collaboration.
                        For those with skills, we provide a gateway to connect with clients and grow.
                    </p>
                </motion.div>
            </div>

            {/* Mission and Vision Section */}
            <motion.div className="row text-center mb-5" variants={staggerContainer}>
                <motion.div
                    className="col-md-6 mb-4 mb-md-0"
                    variants={popUp}
                >
                    <div className="p-4 shadow-sm rounded" style={{ backgroundColor: "#EDF2F4" }}>
                        <h3 className="fw-bold" style={{ color: "#2B2D42" }}>Our Mission</h3>
                        <p style={{ color: "#4A4E69" }}>
                            To empower individuals and businesses by building a reliable marketplace for tasks,
                            fostering opportunities for collaboration and growth.
                        </p>
                    </div>
                </motion.div>
                <motion.div className="col-md-6" variants={popUp}>
                    <div className="p-4 shadow-sm rounded" style={{ backgroundColor: "#EDF2F4" }}>
                        <h3 className="fw-bold" style={{ color: "#2B2D42" }}>Our Vision</h3>
                        <p style={{ color: "#4A4E69" }}>
                            To become the go-to platform for connecting workers and clients,
                            making daily tasks seamless and hassle-free.
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            {/* How It Works Section */}
            <motion.div className="mb-5" variants={fadeIn}>
                <h2 className="fw-bold text-center mb-4" style={{ color: "#2B2D42" }}>How It Works</h2>
                <div className="row text-center">
                    {[
                        { step: "1. Find a Task", desc: "Search for services or post a request for assistance." },
                        { step: "2. Connect with Taskers", desc: "Choose the right person from profiles and reviews." },
                        { step: "3. Get It Done", desc: "Complete the task and share your feedback." }
                    ].map(({ step, desc }, index) => (
                        <motion.div
                            className="col-md-4 mb-4 mb-md-0"
                            key={index}
                            variants={popUp}
                        >
                            <div
                                className="card p-4 shadow-sm border-0"
                                style={{ backgroundColor: "#EDF2F4", color: "#4A4E69" }}
                            >
                                <h5 className="fw-bold" style={{ color: "#0077B6" }}>{step}</h5>
                                <p>{desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Call-to-Action Section */}
            <motion.div className="text-center" variants={fadeIn}>
                <h2 className="fw-bold" style={{ color: "#2B2D42" }}>Join Job Junction Today!</h2>
                <p className="text-muted">
                    Simplify your life, whether you&#39;re a client looking for help or a tasker offering services.
                </p>
                <button
                    className="btn px-4 py-2"
                    style={{ backgroundColor: "#0077B6", color: "#FFFFFF", borderRadius: "25px" }}
                    onClick={(e) => handleLinkClick(e, '/', navigate)}
                >
                    Get Started Now
                </button>
            </motion.div>
        </motion.div>
    );
};

export default About;
