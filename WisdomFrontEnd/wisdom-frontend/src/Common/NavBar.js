import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">

                <div className="text-white text-lg font-bold flex gap-x-6">
                    <img className="w-20 h-6" src="/Assets/logo.jpg" /> <div className=""> WISDOM COMPUTER TECHNOLOGIES</div>
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link to="/services" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                        Services
                    </Link>
                    <Link to="/about" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                        About Us
                    </Link>
                    <Link to="/my-account" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                        My Account
                    </Link>
                    <Link to="/my-repairs" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                        My Repairs
                    </Link>
                    <Link to="/purchase-options" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                        Purchase Options
                    </Link>
                    <Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Login</Link>
                    <Link to="/register" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Register</Link>
                </div>
                <div className="md:hidden">
                    <button className="text-white">
                        {/* Icon for mobile menu (optional) */}
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;