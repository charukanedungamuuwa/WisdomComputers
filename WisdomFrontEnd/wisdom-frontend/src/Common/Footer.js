import React from 'react';

const Footer = () => {
    return (
        <footer className="  bg-gray-800 text-white py-4 mt-auto">
            <div className="container mx-auto text-center">
                <p className="mb-2">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
                <div className="flex justify-center space-x-4">
                    <a href="/services" className="hover:underline">Services</a>
                    <a href="/about" className="hover:underline">About Us</a>
                    <a href="/my-account" className="hover:underline">My Account</a>
                    <a href="/my-repairs" className="hover:underline">My Repairs</a>
                    <a href="/purchase-options" className="hover:underline">Purchase Options</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;