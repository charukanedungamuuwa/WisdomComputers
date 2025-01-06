//
//
// import React, { useState } from 'react';
// import axios from 'axios';
//
// const Register = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         roles: 'ROLE_USER', // Default role
//     });
//
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
//
//     const handleRoleChange = (role) => {
//         setFormData({ ...formData, roles: role });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         const { name, email, password, confirmPassword, roles } = formData;
//
//         // Check if passwords match
//         if (password !== confirmPassword) {
//             setError('Passwords do not match');
//             return;
//         }
//
//         try {
//             // Sending the data to the backend
//             const response = await axios.post('http://localhost:8080/auth/addNewUser', {
//                 name,
//                 email,
//                 password,
//                 roles, // Include the role in the request
//             });
//
//             setMessage('Registration successful!');
//             setError('');
//         } catch (err) {
//             console.error(err);
//             setError('An error occurred while registering. Please try again.');
//         }
//     };
//
//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
//                 <h2 className="text-2xl font-bold mb-4">Register</h2>
//                 {message && <p className="text-green-600">{message}</p>}
//                 {error && <p className="text-red-600">{error}</p>}
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Confirm Password</label>
//                     <input
//                         type="password"
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                     />
//                 </div>
//                 <div className="flex space-x-4 mb-4">
//                     <button
//                         type="button"
//                         onClick={() => handleRoleChange('ROLE_USER')}
//                         className={`py-2 px-4 rounded ${formData.roles === 'ROLE_USER' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                     >
//                         Register User
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => handleRoleChange('ROLE_SUPPLIER')}
//                         className={`py-2 px-4 rounded ${formData.roles === 'ROLE_SUPPLIER' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                     >
//                         Register Supplier
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => handleRoleChange('ROLE_EMPLOYEE')}
//                         className={`py-2 px-4 rounded ${formData.roles === 'ROLE_EMPLOYEE' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                     >
//                         Register Employee
//                     </button>
//                 </div>
//                 <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
//                     Register
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default Register;
import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        joinedDate: "",
        password: "",
        confirmPassword: "",
        roles: "ROLE_USER", // Default role
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRoleChange = (role) => {
        setFormData({ ...formData, roles: role });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone, address, joinedDate, password, confirmPassword, roles } = formData;

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            // Sending the data to the backend
            const response = await axios.post("http://localhost:8080/auth/addNewUser", {
                name,
                email,
                phone,
                address,
                joinedDate,
                password,
                roles, // Include the role in the request
            });

            setMessage("Registration successful!");
            setError("");
        } catch (err) {
            console.error(err);
            setError("An error occurred while registering. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                {message && <p className="text-green-600">{message}</p>}
                {error && <p className="text-red-600">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Joined Date</label>
                    <input
                        type="date"
                        name="joinedDate"
                        value={formData.joinedDate}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex space-x-4 mb-4">
                    <button
                        type="button"
                        onClick={() => handleRoleChange("ROLE_USER")}
                        className={`py-2 px-4 rounded ${formData.roles === "ROLE_USER" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        Register User
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleChange("ROLE_SUPPLIER")}
                        className={`py-2 px-4 rounded ${formData.roles === "ROLE_SUPPLIER" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        Register Supplier
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleChange("ROLE_EMPLOYEE")}
                        className={`py-2 px-4 rounded ${formData.roles === "ROLE_EMPLOYEE" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        Register Employee
                    </button>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
