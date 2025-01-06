import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import {jwtDecode} from "jwt-decode";

const MyAccount = () => {
    const { token } = useAuth();
    const [accountDetails, setAccountDetails] = useState(null);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [showChangeFields, setShowChangeFields] = useState(false);

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            axios
                .get(`http://localhost:8080/auth/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setAccountDetails(response.data);
                    setNewUsername(response.data.name);
                    setNewEmail(response.data.email);
                    setNewPhone(response.data.phone);
                    setNewAddress(response.data.address);
                })
                .catch((error) => {
                    console.error("There was an error fetching the user details!", error);
                });
        }
    }, [token]);

    const handleUpdate = () => {
        if (token && accountDetails) {
            const updatedUser = {
                ...accountDetails,
                name: newUsername,
                email: newEmail,
                phone: newPhone,
                address: newAddress,
                password: newPassword,
            };

            axios
                .put(`http://localhost:8080/auth/${accountDetails.id}`, updatedUser, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setAccountDetails(response.data);
                    setShowChangeFields(false);
                })
                .catch((error) => {
                    console.error("Error updating user details:", error);
                });
        }
    };

    if (!accountDetails) return <div className="loading">Loading...</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
                <h2 className="text-4xl font-semibold text-center text-blue-600 mb-6">
                    My Account
                </h2>
                <div className="flex items-center mb-8">
                    <img
                        src="/path/to/profile/picture.jpg"
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
                    />
                    <div className="ml-6">
                        <h3 className="text-2xl font-bold">{accountDetails.name}</h3>
                        <p className="text-gray-600">{accountDetails.email}</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4 text-blue-600">Account Details</h3>
                    <div className="space-y-3">
                        <DetailRow label="Username" value={accountDetails.name} />
                        <DetailRow label="Email" value={accountDetails.email} />
                        <DetailRow label="Phone" value={accountDetails.phone} />
                        <DetailRow label="Address" value={accountDetails.address} />
                        <DetailRow label="Join Date" value={accountDetails.joinedDate} />
                    </div>
                </div>
                <button
                    onClick={() => setShowChangeFields(!showChangeFields)}
                    className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    {showChangeFields ? "Cancel" : "Edit"}
                </button>
                {showChangeFields && (
                    <div className="mt-6 space-y-4">
                        <InputField
                            label="New Username"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                        <InputField
                            label="New Email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <InputField
                            label="New Phone"
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                        />
                        <InputField
                            label="New Address"
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                        />
                        <InputField
                            label="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                            onClick={handleUpdate}
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const DetailRow = ({ label, value }) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-600 font-semibold">{label}:</span>
        <span className="text-gray-800">{value}</span>
    </div>
);

const InputField = ({ label, type = "text", value, onChange }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
    </div>
);

export default MyAccount;
