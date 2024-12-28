import { motion } from "framer-motion";
import Search from "./Home/Search.jsx";
import ServiceCategories from "./Home/ServiceCategories.jsx";
import Achievements from "./Home/Achievements.jsx";
import PopularProjects from "./Home/PopularProjects.jsx";
import TopRatings from "./Home/TopRatings.jsx";
import ThreeStepsToBook from "./Home/ThreeStepsToBook.jsx";
import QuickSuggestions from "./Home/QuickSuggestions.jsx";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
    const components = [
        <Search />,
        <ServiceCategories />,
        <Achievements />,
        <PopularProjects />,
        <TopRatings />,
        <ThreeStepsToBook />,
        <QuickSuggestions />,
    ];

    useEffect(() => {
        // Fetch data without blocking component rendering
        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/task/get-all-task");
                if (response.data.success) {
                    const fetchedServices = response.data.tasks;

                    // Save fetched data to sessionStorage
                    sessionStorage.setItem("services", JSON.stringify(fetchedServices));
                } else {
                    console.error("Failed to fetch services:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div>
            {components.map((Component, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                        delay: index * 0.05,
                    }}
                    style={{ position: "relative" }}
                >
                    {Component}
                </motion.div>
            ))}
        </div>
    );
};

export default Home;
