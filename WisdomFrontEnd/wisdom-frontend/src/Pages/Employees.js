// import React, { useEffect, useState } from "react";
//
// const Employees = () => {
//     const [employees, setEmployees] = useState([]);
//     const [newEmployee, setNewEmployee] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         address: "",
//     });
//     const [editMode, setEditMode] = useState(false);
//     const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
//     const [imageFile, setImageFile] = useState(null);
//     const [error, setError] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//
//     useEffect(() => {
//         const fetchEmployees = async () => {
//             try {
//                 const response = await fetch("http://localhost:8080/employees");
//                 if (!response.ok) throw new Error("Failed to fetch employees.");
//                 const data = await response.json();
//                 setEmployees(data);
//             } catch (err) {
//                 setError("Failed to load employees. Please try again later.");
//             }
//         };
//         fetchEmployees();
//     }, []);
//
//     const handleEmployeeSubmit = async () => {
//         setError("");
//         setSuccessMessage("");
//
//         if (!newEmployee.name || !newEmployee.email || !newEmployee.phone) {
//             setError("Name, email, and phone are required fields.");
//             return;
//         }
//
//         const formData = new FormData();
//         formData.append("name", newEmployee.name);
//         formData.append("email", newEmployee.email);
//         formData.append("phone", newEmployee.phone);
//         formData.append("address", newEmployee.address);
//         if (imageFile) formData.append("imageFile", imageFile);
//
//         try {
//             let response;
//             if (editMode) {
//                 response = await fetch(
//                     `http://localhost:8080/employees/${currentEmployeeId}`,
//                     {
//                         method: "PUT",
//                         body: formData,
//                     }
//                 );
//                 setSuccessMessage("Employee updated successfully!");
//             } else {
//                 response = await fetch("http://localhost:8080/employees", {
//                     method: "POST",
//                     body: formData,
//                 });
//                 setSuccessMessage("Employee added successfully!");
//             }
//
//             if (!response.ok) throw new Error("Failed to save employee.");
//             const updatedEmployee = await response.json();
//
//             setEmployees((prevEmployees) => {
//                 if (editMode) {
//                     return prevEmployees.map((employee) =>
//                         employee.empId === currentEmployeeId
//                             ? updatedEmployee
//                             : employee
//                     );
//                 } else {
//                     return [...prevEmployees, updatedEmployee];
//                 }
//             });
//
//             setNewEmployee({
//                 name: "",
//                 email: "",
//                 phone: "",
//                 address: "",
//             });
//             setImageFile(null);
//             setEditMode(false);
//             setCurrentEmployeeId(null);
//         } catch (err) {
//             setError("Failed to save employee. Please try again.");
//         }
//     };
//
//     const deleteEmployee = async (empId) => {
//         try {
//             const response = await fetch(
//                 `http://localhost:8080/employees/${empId}`,
//                 {
//                     method: "DELETE",
//                 }
//             );
//             if (!response.ok) throw new Error("Failed to delete employee.");
//             setEmployees((prevEmployees) =>
//                 prevEmployees.filter((employee) => employee.empId !== empId)
//             );
//             setSuccessMessage("Employee deleted successfully!");
//         } catch (err) {
//             setError("Failed to delete employee. Please try again.");
//         }
//     };
//
//     const startEditing = (employee) => {
//         setNewEmployee({
//             name: employee.name,
//             email: employee.email,
//             phone: employee.phone,
//             address: employee.address,
//         });
//         setCurrentEmployeeId(employee.empId);
//         setEditMode(true);
//         setSuccessMessage("");
//         setError("");
//     };
//
//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Employees</h1>
//
//             {error && <p className="text-red-500 mb-4">{error}</p>}
//             {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
//
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {employees.map((employee) => (
//                     <div key={employee.empId} className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
//                         <img
//                             className="w-full h-48 object-cover"
//                             src={employee.image ? `data:image/jpeg;base64,${employee.image}` : "https://via.placeholder.com/150"}
//                             alt={employee.name}
//                         />
//                         <div className="p-4">
//                             <h2 className="font-bold text-xl mb-2">{employee.name}</h2>
//                             <p className="text-gray-700 mb-2">Email: {employee.email}</p>
//                             <p className="text-gray-600">Phone: {employee.phone}</p>
//                             <p className="text-gray-600">Address: {employee.address}</p>
//                         </div>
//                         <div className="flex justify-between items-center p-4">
//                             <button onClick={() => deleteEmployee(employee.empId)} className="text-red-500">
//                                 Delete
//                             </button>
//                             <button onClick={() => startEditing(employee)} className="text-blue-500">
//                                 Edit
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//
//             <div className="mt-6">
//                 <h2 className="text-xl font-bold">{editMode ? "Edit Employee" : "Add New Employee"}</h2>
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={newEmployee.name}
//                     onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
//                     className="border p-2 mb-2 w-full"
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={newEmployee.email}
//                     onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
//                     className="border p-2 mb-2 w-full"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Phone"
//                     value={newEmployee.phone}
//                     onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
//                     className="border p-2 mb-2 w-full"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Address"
//                     value={newEmployee.address}
//                     onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
//                     className="border p-2 mb-2 w-full"
//                 />
//                 <div className="mb-4">
//                     <label htmlFor="imageUpload" className="block mb-2 font-bold">
//                         Upload Image
//                     </label>
//                     <input
//                         type="file"
//                         id="imageUpload"
//                         accept="image/*"
//                         onChange={(e) => setImageFile(e.target.files[0])}
//                         className="border p-2 w-full"
//                     />
//                 </div>
//                 <button onClick={handleEmployeeSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
//                     {editMode ? "Update Employee" : "Add Employee"}
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default Employees;
import React, { useEffect, useState } from "react";
import axios from "axios";

const Employees = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/auth/employee", {
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
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Our Employees</h1>
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

export default Employees;
