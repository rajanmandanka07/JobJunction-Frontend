import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RouterProtection = (props) => {
    const [cookies] = useCookies(["isUserLoggedIn", "token"]);
    const isUserLoggedIn = cookies.isUserLoggedIn;
    const token = cookies.token;

    const navigate = useNavigate();

    useEffect(() => {
        console.log("User: ", isUserLoggedIn, ", Toke: ", token);
        if (!isUserLoggedIn && !token) {
            navigate("/login");
        }
    }, [isUserLoggedIn, navigate, token]);

    if (!isUserLoggedIn) {
        return null;
    }

    return (<>{props.element}</>);
};

export default RouterProtection;
