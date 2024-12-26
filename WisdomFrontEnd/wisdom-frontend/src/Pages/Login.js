// import React, { useState } from 'react';
// import axios from 'axios';
//
// const Login = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
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
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         const { username, password } = formData;
//
//         try {
//             // Send login request to backend
//             const response = await axios.post('http://localhost:8080/auth/generateToken', {
//                 username,
//                 password,
//             });
//
//             // On success, store JWT in local storage
//             if (response.data) {
//                 localStorage.setItem('token', response.data);
//                 setMessage('Login successful!');
//                 setError('');
//                 console.log('Token:', response.data); // For debugging
//             }
//         } catch (err) {
//             console.error(err);
//             setError('Invalid username or password');
//             setMessage('');
//         }
//     };
//
//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
//                 <h2 className="text-2xl font-bold mb-4">Login</h2>
//                 {message && <p className="text-green-600">{message}</p>}
//                 {error && <p className="text-red-600">{error}</p>}
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Username</label>
//                     <input
//                         type="text"
//                         name="username"
//                         value={formData.username}
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
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default Login;







import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import jwt_decode from 'jwt-decode'; // Import jwt-decode
import { jwtDecode } from 'jwt-decode';


import { useAuth } from './AuthContext'; // Ensure AuthContext is implemented

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState(''); // Success message state
    const [error, setError] = useState(''); // Error message state
    const [loading, setLoading] = useState(false); // Loading state

    const { login } = useAuth(); // Access the login function from AuthContext
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        setMessage(''); // Clear any previous messages

        try {
            setLoading(true); // Set loading state to true

            // Send login request to the API
            const { username, password } = formData;
            const response = await axios.post('http://localhost:8080/auth/generateToken', {
                username,
                password,
            });

            console.log('Server response:', response.data); // Debug log the response

            // On success, store JWT in local storage
            if (response.data) {
                const token = response.data.token || response.data; // Handle cases where token might not be nested
                //const role = response.data.role || 'ROLE_USER'; // Default role if not provided
                //const decodedToken = jwt_decode(token);
                const decodedToken = jwtDecode(token);

                //const role = decodedToken.role || 'ROLE_USER';
                const roles = decodedToken.roles;
                const primaryRole = roles[0];
                // Save token and role using AuthContext
                login(token, primaryRole);

                // Save the token to localStorage
                localStorage.setItem('token', token);

                setMessage('Login successful!'); // Set success message
                setError(''); // Clear any error messages

                // Redirect based on role
                switch (primaryRole) {
                    case 'ROLE_ADMIN':
                        navigate('/admin-dashboard');
                        break;
                    case 'ROLE_SUPPLIER':
                        navigate('/supplier-dashboard');
                        break;
                    default:
                        navigate('/user-dashboard');
                        break;
                }
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('Invalid username or password'); // Display error message
            setMessage(''); // Clear success message
        } finally {
            setLoading(false); // Set loading state to false after request completes
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {message && <p className="text-green-600">{message}</p>} {/* Success message */}
                {error && <p className="text-red-600">{error}</p>} {/* Error message */}
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
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
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
