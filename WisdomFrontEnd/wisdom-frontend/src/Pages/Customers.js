import React, { useEffect, useState } from "react";
import axios from "axios";

const Customers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/auth/user", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token for authentication
                    },
                });
                setSuppliers(response.data);
            } catch (err) {
                setError("Failed to fetch suppliers. Please try again.");
            }
        };

        fetchSuppliers();
    }, []);

    return (
        <div className="relative mt-32 ">

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8 mt-32 pt-3 ">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Our Customers</h1>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                {suppliers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
                        {suppliers.map((supplier) => (
                            <div
                                key={supplier.id}
                                className="bg-gradient-to-r from-purple-400 to-blue-500 text-white shadow-lg rounded-lg p-6 hover:scale-105 transform transition-all duration-300 overflow-hidden"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden">
                                        <img
                                            src={supplier.profileImage || "/default-profile.png"} // Default profile image
                                            alt={`${supplier.name}'s profile`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-xl font-bold">{supplier.name}</h2>
                                        <p className="text-sm opacity-90">{supplier.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="flex items-center">
                                        <span className="mr-2 text-xl">📞</span>
                                        <span>{supplier.phone}</span>
                                    </p>
                                    <p className="flex items-center">
                                        <span className="mr-2 text-xl">📍</span>
                                        <span>{supplier.address}</span>
                                    </p>
                                    <p className="flex items-center">
                                        <span className="mr-2 text-xl">📅</span>
                                        <span>{supplier.joinedDate}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">No suppliers found.</p>
                )}
            </div></div>
    );
};

export default Customers;
