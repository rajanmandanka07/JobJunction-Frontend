import { Link } from 'react-router-dom';
import logo from'../assets/JobJunction.jpeg'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    const handleLinkClick = (e, targetRoute, navigate) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            navigate(targetRoute);
        }, 500);
    };

    return (
        <footer className="bg-dark text-light pt-5 pb-4">
            <div className="container">
                <div className="row justify-content-between">
                    {/* Branding Section */}
                    <div className="col-md-4 mb-4">
                        <h4 className="d-flex align-items-center mb-3">
                            <img
                                src={logo} // Replace with your logo path
                                alt="Job Junction"
                                className="rounded-circle me-2"
                                style={{ width: '50px', height: '50px' }}
                            />
                            <span>Job Junction</span>
                        </h4>
                        <p className="small">
                            Job Junction connects workers and employers seamlessly. Find the
                            right person or the perfect job for your needs!
                        </p>
                        <p className="small">
                            Finding work made easy! Discover local jobs or register as a worker and get hired for your skills.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="col-md-3 mb-4">
                        <h5 className="mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link
                                    className="text-decoration-none text-light"
                                    to="/"
                                    onClick={(e) => handleLinkClick(e, '/', navigate)}
                                >
                                    Home
                                </Link>
                            </li>
                            {!token && (
                                <>
                                    <li className="mb-2">
                                        <Link
                                            className="text-decoration-none text-light"
                                            to="/user-signup"
                                            onClick={(e) => handleLinkClick(e, '/user-signup', navigate)}
                                        >
                                            Register
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link
                                            className="text-decoration-none text-light"
                                            to="/login"
                                            onClick={(e) => handleLinkClick(e, '/login', navigate)}
                                        >
                                            Login
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li className="mb-2">
                                <Link
                                    className="text-decoration-none text-light"
                                    to="/available-services"
                                    onClick={(e) => handleLinkClick(e, '/available-services', navigate)}
                                >
                                    Available Services
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-decoration-none text-light"
                                    to="/about"
                                    onClick={(e) => handleLinkClick(e, '/about', navigate)}
                                >
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-md-4 mb-4">
                        <h5 className="mb-3">Contact Us</h5>
                        <p className="small mb-1">
                            <i className="bi bi-envelope-fill me-2"></i>
                            support@jobjunction.com
                        </p>
                        <p className="small mb-1">
                            <i className="bi bi-telephone-fill me-2"></i>
                            +1 234 567 890
                        </p>
                        <p className="small">
                            <i className="bi bi-geo-alt-fill me-2"></i>
                            123 Job Junction Street, Worktown, USA
                        </p>
                    </div>
                </div>

                <hr className="border-secondary"/>
                <div className="text-center">
                    <p className="mb-0 small">
                        © {new Date().getFullYear()} Job Junction. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
