import React, { useEffect, useState } from "react";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:8080/employees");
                if (!response.ok) throw new Error("Failed to fetch employees.");
                const data = await response.json();
                setEmployees(data);
            } catch (err) {
                setError("Failed to load employees. Please try again later.");
            }
        };
        fetchEmployees();
    }, []);

    const handleEmployeeSubmit = async () => {
        setError("");
        setSuccessMessage("");

        if (!newEmployee.name || !newEmployee.email || !newEmployee.phone) {
            setError("Name, email, and phone are required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("name", newEmployee.name);
        formData.append("email", newEmployee.email);
        formData.append("phone", newEmployee.phone);
        formData.append("address", newEmployee.address);
        if (imageFile) formData.append("imageFile", imageFile);

        try {
            let response;
            if (editMode) {
                response = await fetch(
                    `http://localhost:8080/employees/${currentEmployeeId}`,
                    {
                        method: "PUT",
                        body: formData,
                    }
                );
                setSuccessMessage("Employee updated successfully!");
            } else {
                response = await fetch("http://localhost:8080/employees", {
                    method: "POST",
                    body: formData,
                });
                setSuccessMessage("Employee added successfully!");
            }

            if (!response.ok) throw new Error("Failed to save employee.");
            const updatedEmployee = await response.json();

            setEmployees((prevEmployees) => {
                if (editMode) {
                    return prevEmployees.map((employee) =>
                        employee.empId === currentEmployeeId
                            ? updatedEmployee
                            : employee
                    );
                } else {
                    return [...prevEmployees, updatedEmployee];
                }
            });

            setNewEmployee({
                name: "",
                email: "",
                phone: "",
                address: "",
            });
            setImageFile(null);
            setEditMode(false);
            setCurrentEmployeeId(null);
        } catch (err) {
            setError("Failed to save employee. Please try again.");
        }
    };

    const deleteEmployee = async (empId) => {
        try {
            const response = await fetch(
                `http://localhost:8080/employees/${empId}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) throw new Error("Failed to delete employee.");
            setEmployees((prevEmployees) =>
                prevEmployees.filter((employee) => employee.empId !== empId)
            );
            setSuccessMessage("Employee deleted successfully!");
        } catch (err) {
            setError("Failed to delete employee. Please try again.");
        }
    };

    const startEditing = (employee) => {
        setNewEmployee({
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            address: employee.address,
        });
        setCurrentEmployeeId(employee.empId);
        setEditMode(true);
        setSuccessMessage("");
        setError("");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Employees</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {employees.map((employee) => (
                    <div key={employee.empId} className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
                        <img
                            className="w-full h-48 object-cover"
                            src={employee.image ? `data:image/jpeg;base64,${employee.image}` : "https://via.placeholder.com/150"}
                            alt={employee.name}
                        />
                        <div className="p-4">
                            <h2 className="font-bold text-xl mb-2">{employee.name}</h2>
                            <p className="text-gray-700 mb-2">Email: {employee.email}</p>
                            <p className="text-gray-600">Phone: {employee.phone}</p>
                            <p className="text-gray-600">Address: {employee.address}</p>
                        </div>
                        <div className="flex justify-between items-center p-4">
                            <button onClick={() => deleteEmployee(employee.empId)} className="text-red-500">
                                Delete
                            </button>
                            <button onClick={() => startEditing(employee)} className="text-blue-500">
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-bold">{editMode ? "Edit Employee" : "Add New Employee"}</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={newEmployee.address}
                    onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <div className="mb-4">
                    <label htmlFor="imageUpload" className="block mb-2 font-bold">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="border p-2 w-full"
                    />
                </div>
                <button onClick={handleEmployeeSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
                    {editMode ? "Update Employee" : "Add Employee"}
                </button>
            </div>
        </div>
    );
};

export default Employees;