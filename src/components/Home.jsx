import { motion } from "framer-motion";
import Search from "./Home/Search.jsx";
import ServiceCategories from "./Home/ServiceCategories.jsx";
import Achievements from "./Home/Achievements.jsx";
import PopularProjects from "./Home/PopularProjects.jsx";
import TopRatings from "./Home/TopRatings.jsx";
import ThreeStepsToBook from "./Home/ThreeStepsToBook.jsx";
import QuickSuggestions from "./Home/QuickSuggestions.jsx";

const Home = () => {
    const components = [
        // eslint-disable-next-line react/jsx-key
        <Search />,
        // eslint-disable-next-line react/jsx-key
        <ServiceCategories />,
        // eslint-disable-next-line react/jsx-key
        <Achievements />,
        // eslint-disable-next-line react/jsx-key
        <PopularProjects />,
        // eslint-disable-next-line react/jsx-key
        <TopRatings />,
        // eslint-disable-next-line react/jsx-key
        <ThreeStepsToBook />,
        // eslint-disable-next-line react/jsx-key
        <QuickSuggestions />,
    ];

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
