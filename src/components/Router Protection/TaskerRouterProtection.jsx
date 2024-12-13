import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TaskerRouterProtection = (props) => {
    const [cookies] = useCookies(["isUserLoggedIn", "role", "token"]);
    const isUserLoggedIn = cookies.isUserLoggedIn;
    const role = cookies.role;
    const token = cookies.token;

    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserLoggedIn && !(role === "tasker") && !token) {
            navigate("/login"); // Redirect to login page
        }
    }, [isUserLoggedIn, navigate, token, role]);

    if (!isUserLoggedIn) {
        return null;
    }

    return (<>{props.element}</>);
};

export default TaskerRouterProtection;
