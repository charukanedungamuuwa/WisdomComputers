import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Pages/AuthContext";

const NavBar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Clears the token and resets authentication state
        navigate("/Login"); // Navigates to the "About" page
    };

    return (
        <nav className="bg-gray-800 p-4 fixed top-0 w-full z-50 shadow-lg ">
            <div className="container mx-auto flex justify-between items-center ">
                {/* Logo Section */}
                <Link to="/homepage" className="no-underline">
                <div className="flex items-center space-x-4 ">

                    <img className="w-24 h-10" src="/Assets/logo.jpg" alt="Logo"/>
                    <div className="text-white font-bold "> WISDOM COMPUTER TECHNOLOGIES</div>
                </div>
                </Link>
                {/* Links Section */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link
                        to="/services"
                        className="flex flex-col items-center text-white hover:text-gray-300 no-underline transform transition duration-300 hover:scale-110"
                    >
                        <i className="fas fa-tools text-1xl mb-1"></i>
                        <span className="text-sm font-bold">Services</span>
                    </Link>
                    <Link
                        to="/about"
                        className="flex flex-col items-center text-white hover:text-gray-300 no-underline transform transition duration-300 hover:scale-110"
                    >
                        <i className="fas fa-info-circle text-1xl mb-1"></i>
                        <span className="text-sm font-bold">About Us</span>
                    </Link>
                    {isAuthenticated && (
                        <Link
                            to="/my-account"
                            className="flex flex-col items-center text-white hover:text-gray-300 no-underline transform transition duration-300 hover:scale-110"
                        >
                            <i className="fas fa-user text-1xl mb-1"></i>
                            <span className="text-sm font-bold">My Account</span>
                        </Link>
                    )}
                    <Link
                        to="/my-repairs"
                        className="flex flex-col items-center text-white hover:text-gray-300 no-underline transform transition duration-300 hover:scale-110"
                    >
                        <i className="fas fa-wrench text-1xl mb-1"></i>
                        <span className="text-sm font-bold">My Repairs</span>
                    </Link>

                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="flex flex-col items-center text-white hover:text-gray-300 no-underline transform transition duration-300 hover:scale-110"
                        >
                            <i className="fas fa-sign-out-alt text-1xl mb-1"></i>
                            <span className="text-sm font-bold">Log Out</span>
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="flex flex-col items-center text-white hover:text-gray-300 no-underline transform transition duration-300 hover:scale-110"
                        >
                            <i className="fas fa-sign-in-alt text-1xl mb-1"></i>
                            <span className="text-sm font-bold">Login</span>
                        </Link>
                    )}
                    {!isAuthenticated ? (
                        <Link
                            to="/register"
                            className="flex flex-col items-center text-white hover:text-gray-300 no-underline transform transition duration-300 hover:scale-110"
                        >
                            <i className="fas fa-user-plus text-1xl mb-1"></i>
                            <span className="text-sm font-bold">Register</span>
                        </Link>
                    ) : (
                        ""
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button className="text-white">
                        <svg
                            className="w-6 h-6 transform transition duration-300 hover:rotate-90"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
