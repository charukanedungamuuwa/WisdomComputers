import React from 'react';
import { FaCog, FaUsers, FaInfoCircle, FaBoxOpen, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // For animations


const HomePage = () => {
    const navigate = useNavigate(); // React Router hook for navigation
    const token = localStorage.getItem("token"); // Replace with your auth token storage logic
    // const decodedToken = token ? jwtDecode(token) : null;
    // const userRoles = decodedToken?.roles || [];
    // const isAdmin = userRoles.includes("ROLE_ADMIN");
    let isAdmin = false;

    try {
        const decodedToken = token ? jwtDecode(token) : null;
        const userRoles = decodedToken?.roles || [];
        isAdmin = userRoles.includes("ROLE_ADMIN");
    } catch (err) {
        console.error("Token decoding failed:", err);
        isAdmin = false; // Fallback to not logged in
    }
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 mt-8">
            {/* Header Section */}
            <header className="bg-blue-600 text-white text-center py-8">
                <motion.h1
                    className="text-4xl font-bold mb-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Welcome to Our Home Page
                </motion.h1>
                <motion.p
                    className="text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Your one-stop solution for all your needs!
                </motion.p>
            </header>

            {/* Navigation Section */}
            <nav className="bg-white shadow sticky top-0 z-10">
                <ul className="flex justify-center space-x-6 py-4 text-blue-600 font-semibold">
                    <li><a href="#services" className="hover:text-blue-800">Services</a></li>
                    <li><a href="#suppliers" className="hover:text-blue-800">Suppliers</a></li>
                    <li><a href="#about-us" className="hover:text-blue-800">About Us</a></li>
                    <li><a href="#our-products" className="hover:text-blue-800">Our Products</a></li>
                    <li><a href="#customers" className="hover:text-blue-800">Customers</a></li>
                </ul>
            </nav>

            {/* Main Content */}
            <main className="py-10 px-6 md:px-20">
                {/* Card Buttons Section */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Services Card */}
                    <motion.div
                        className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                        whileHover={{scale: 1.05}}
                    >
                        <button onClick={() => navigate('/my-repairs')}>
                            <img src="/Assets/services.jpg" alt="Services"
                                 className="w-full h-32 object-cover mb-4 rounded-lg"/>
                            <FaCog className="text-blue-600 text-4xl mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-2">Services</h3>
                            <p className="text-gray-600">Explore our comprehensive range of services.</p>
                        </button>
                    </motion.div>

                    {/* Suppliers Card */}
                    <motion.div
                        className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                        whileHover={{scale: 1.05}}
                    >
                        <button onClick={() => navigate('/suppliers')}>
                            <img src="/Assets/suppliers.jpg" alt="Suppliers"
                                 className="w-full h-32 object-cover mb-4 rounded-lg"/>
                            <FaHandshake className="text-blue-600 text-4xl mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-2">Suppliers</h3>
                            <p className="text-gray-600">Partner with trusted suppliers to ensure quality.</p>
                        </button>
                    </motion.div>

                    {/* About Us Card */}
                    <motion.div
                        className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                        whileHover={{scale: 1.05}}
                    >
                        <button onClick={() => navigate('/aboutus')}>
                            <img src="/Assets/about-us.jpg" alt="About Us"
                                 className="w-full h-32 object-cover mb-4 rounded-lg"/>
                            <FaInfoCircle className="text-blue-600 text-4xl mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-2">About Us</h3>
                            <p className="text-gray-600">Learn more about our mission and vision.</p>
                        </button>
                    </motion.div>

                    {/* Products Card */}
                    <motion.div
                        className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                        whileHover={{scale: 1.05}}
                    >
                        {isAdmin ? (
                            <button onClick={() => navigate('/products')}>
                                <img src="/Assets/products.jpg" alt="Products"
                                     className="w-full h-32 object-cover mb-4 rounded-lg"/>
                                <FaBoxOpen className="text-blue-600 text-4xl mx-auto mb-4"/>
                                <h3 className="text-xl font-bold mb-2">Our Products</h3>
                                <p className="text-gray-600">Discover our diverse range of products.</p>
                            </button>) : (
                            <button onClick={() => navigate('/showproducts')}>
                                <img src="/Assets/products.jpg" alt="Products"
                                     className="w-full h-32 object-cover mb-4 rounded-lg"/>
                                <FaBoxOpen className="text-blue-600 text-4xl mx-auto mb-4"/>
                                <h3 className="text-xl font-bold mb-2">Our Products</h3>
                                <p className="text-gray-600">Discover our diverse range of products.</p>
                            </button>)}
                    </motion.div>

                    {/* Customers Card */}
                    <motion.div
                        className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                        whileHover={{scale: 1.05}}
                    >
                        <button onClick={() => navigate('/customers')}>
                            <img src="/Assets/customers.jpg" alt="Customers"
                                 className="w-full h-32 object-cover mb-4 rounded-lg"/>
                            <FaUsers className="text-blue-600 text-4xl mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-2">Customers</h3>
                            <p className="text-gray-600">See why customers trust us to achieve their goals.</p>
                        </button>
                    </motion.div>

                    <motion.div
                        className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                        whileHover={{scale: 1.05}}
                    >
                        <button onClick={() => navigate('/employees')}>
                            <img src="/Assets/employees.jpg" alt="Customers"
                                 className="w-full h-32 object-cover mb-4 rounded-lg"/>
                            <FaUsers className="text-blue-600 text-4xl mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-2">Employees</h3>
                            <p className="text-gray-600">See why customers trust us to achieve their goals.</p>
                        </button>
                    </motion.div>
                    <motion.div
                        className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                        whileHover={{scale: 1.05}}
                    >
                        <button onClick={() => navigate('/customers')}>
                            <img src="/Assets/customers.jpg" alt="Customers"
                                 className="w-full h-32 object-cover mb-4 rounded-lg"/>
                            <FaUsers className="text-blue-600 text-4xl mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-2">Repair Log</h3>
                            <p className="text-gray-600">See why customers trust us to achieve their goals.</p>
                        </button>
                    </motion.div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-blue-600 text-white text-center py-4">
                <motion.p
                    className="text-sm"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1.2}}
                >
                    © 2025 Our Company. All Rights Reserved.
                </motion.p>
            </footer>
        </div>
    );
};

export default HomePage;
