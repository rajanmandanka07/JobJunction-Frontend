import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserRouterProtection = (props) => {
    const [cookies] = useCookies(["isUserLoggedIn", "role", "token"]);
    const isUserLoggedIn = cookies.isUserLoggedIn;
    const role = cookies.role;
    const token = cookies.token;

    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // If the user is not logged in, navigate them to the login page
        console.log(isUserLoggedIn);
        if (!isUserLoggedIn && !token) {
            navigate("/login"); // Redirect to login page
        }
    }, [isUserLoggedIn, navigate, token]); // Dependency array ensures it runs when isUserLoggedIn changes

    // If the user is logged in, render the children components
    if (!isUserLoggedIn) {
        return null; // Return nothing while the navigation happens
    }

    // If the user is logged in, render the children components
    // eslint-disable-next-line react/prop-types
    return (<>{props.element}</>);
};

export default UserRouterProtection;
