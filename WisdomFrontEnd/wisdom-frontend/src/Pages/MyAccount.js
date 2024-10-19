import React, { useState } from 'react';

const MyAccount = () => {
    // Sample account details
    const [accountDetails, setAccountDetails] = useState({
        username: 'charuka123',
        email: 'charuka@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA',
        joinDate: '2022-01-01',
    });

    const [newUsername, setNewUsername] = useState(accountDetails.username);
    const [newPassword, setNewPassword] = useState('');

    const handleUsernameChange = () => {
        setAccountDetails({ ...accountDetails, username: newUsername });
        setNewUsername('');
    };

    return (
        <div className="mx-4 mt-4">
            <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">My Account</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-6">
                    <img
                        src="/path/to/profile/picture.jpg" // Replace with your profile picture path
                        alt="Profile"
                        className="w-20 h-20 rounded-full border-2 border-blue-500 mr-4"
                    />
                    <div>
                        <h3 className="text-xl font-bold">{accountDetails.username}</h3>
                        <p className="text-gray-600">{accountDetails.email}</p>
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-4">Account Details</h3>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="font-semibold">Username:</span>
                        <span>{accountDetails.username}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Email:</span>
                        <span>{accountDetails.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Phone:</span>
                        <span>{accountDetails.phone}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Address:</span>
                        <span>{accountDetails.address}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Join Date:</span>
                        <span>{accountDetails.joinDate}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold mt-6 mb-4">Change Username</h3>
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="New Username"
                        className="border rounded-lg p-2 flex-grow"
                    />
                    <button
                        onClick={handleUsernameChange}
                        className="ml-4 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
                    >
                        Change
                    </button>
                </div>

                <h3 className="text-xl font-bold mt-6 mb-4">Change Password</h3>
                <div className="flex items-center mb-4">
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className="border rounded-lg p-2 flex-grow"
                    />
                    <button
                        onClick={() => alert('Password change feature coming soon!')}
                        className="ml-4 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
                    >
                        Change
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
