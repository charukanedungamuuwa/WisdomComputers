//
// import React, { useEffect, useState } from 'react';
// import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
//
// const RepairPage = () => {
//     const [repairs, setRepairs] = useState([]);
//     const [newRepair, setNewRepair] = useState({ name: '', price: '', description: '' });
//     const [editMode, setEditMode] = useState(false);
//     const [currentRepairId, setCurrentRepairId] = useState(null);
//     const [error, setError] = useState('');
//     const [imageFile, setImageFile] = useState(null);
//     const [successMessage, setSuccessMessage] = useState('');
//
//     useEffect(() => {
//         const fetchRepairs = async () => {
//             try {
//                 const response = await fetch('http://localhost:8080/repairs');
//                 if (!response.ok) throw new Error('Failed to fetch repairs.');
//                 const data = await response.json();
//                 setRepairs(data);
//             } catch (err) {
//                 console.error(err);
//                 setError('Failed to load repairs. Please try again later.');
//             }
//         };
//         fetchRepairs();
//     }, []);
//
//
//
//
//
//     const addRepairCard = async () => {
//         setError('');
//         setSuccessMessage('');
//         if (!newRepair.name || !newRepair.price) {
//             setError('Name and price are required fields.');
//             return;
//         }
//         if (!imageFile) {
//             setError('Please upload an image.');
//             return;
//         }
//
//         try {
//             const formData = new FormData();
//             formData.append('name', newRepair.name);
//             formData.append('price', newRepair.price);
//             formData.append('description', newRepair.description);
//             formData.append('imageFile', imageFile);
//
//             const response = await fetch('http://localhost:8080/repairs', {
//                 method: 'POST',
//                 body: formData,
//             });
//
//             if (!response.ok) throw new Error('Failed to add repair.');
//             const addedRepair = await response.json();
//             setRepairs([...repairs, addedRepair]);
//             setNewRepair({ name: '', price: '', description: '' });
//             setImageFile(null);
//             setSuccessMessage('Repair added successfully!');
//         } catch (err) {
//             console.error(err);
//             setError('Failed to add repair. Please try again.');
//         }
//     };
//
//
//
//
//
//
//
//     const deleteRepairCard =  async (serviceId)=>{
//         try{
//             const response = await fetch(`http://localhost:8080/repairs/${serviceId}`,{
//                 method: 'DELETE',
//             });
//             if (!response.ok) throw new Error('Failed to delete repair.');
//             setRepairs(repairs.filter(repair=>repair.serviceid!==serviceId));
//             setSuccessMessage('Repair deleted successfully!');
//         }catch (err) {
//             console.error(err);
//             setError('Failed to delete repair. Please try again.');
//         }
//     };
//
//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Repairs</h1>
//
//             {error && <p className="text-red-500 mb-4">{error}</p>}
//             {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
//
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {repairs.map((repair) => (
//                     <div key={repair.serviceId} className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
//                         <img
//                             className="w-full h-48 object-cover"
//                             src={repair.image ? `data:image/jpeg;base64,${repair.image}` : 'https://via.placeholder.com/150'}
//                             alt={repair.name}
//                         />
//                         <div className="p-4 ">
//                             <h2 className="font-bold text-xl mb-2 justify-center flex items-center">{repair.name}</h2>
//                             <p className="text-gray-700 text-base mb-2 justify-center flex items-center">Cost: ${repair.price}</p>
//                             <p className="text-gray-600 text-sm justify-center flex items-center">{repair.description}</p>
//                         </div>
//                         <div className=" flex justify-between items-center ">
//                             <button onClick={()=>deleteRepairCard(repair.serviceId)} className="ml-3"><DeleteOutlined/>Delete</button>
//                             <button className="mr-3"><EditOutlined/>Edit</button>
//                         </div>
//                     </div>
//
//                 ))}
//
//             </div>
//
//             <div className="mt-6">
//                 <h2 className="text-xl font-bold">Add New Repair</h2>
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={newRepair.name}
//                     onChange={(e) => setNewRepair({ ...newRepair, name: e.target.value })}
//                     className="border p-2 mb-2 w-full"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Price"
//                     value={newRepair.price}
//                     onChange={(e) => setNewRepair({ ...newRepair, price: e.target.value })}
//                     className="border p-2 mb-2 w-full"
//                 />
//                 <textarea
//                     placeholder="Description"
//                     value={newRepair.description}
//                     onChange={(e) => setNewRepair({ ...newRepair, description: e.target.value })}
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
//                 <button
//                     onClick={addRepairCard}
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     Add Repair
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default RepairPage;
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const RepairPage = () => {
    const [repairs, setRepairs] = useState([]);
    const [newRepair, setNewRepair] = useState({ name: '', price: '', description: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentRepairId, setCurrentRepairId] = useState(null);
    const [error, setError] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchRepairs = async () => {
            try {
                const response = await fetch('http://localhost:8080/repairs');
                if (!response.ok) throw new Error('Failed to fetch repairs.');
                const data = await response.json();
                setRepairs(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load repairs. Please try again later.');
            }
        };
        fetchRepairs();
    }, []);

    const handleRepairSubmit = async () => {
        setError('');
        setSuccessMessage('');

        if (!newRepair.name || !newRepair.price) {
            setError('Name and price are required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('name', newRepair.name);
        formData.append('price', newRepair.price);
        formData.append('description', newRepair.description);
        if (imageFile) formData.append('imageFile', imageFile);

        try {
            let response;
            if (editMode) {
                response = await fetch(`http://localhost:8080/repairs/${currentRepairId}`, {
                    method: 'PUT',
                    body: formData,
                });
                setSuccessMessage('Repair updated successfully!');
            } else {
                response = await fetch('http://localhost:8080/repairs', {
                    method: 'POST',
                    body: formData,
                });
                setSuccessMessage('Repair added successfully!');
            }

            if (!response.ok) throw new Error('Failed to save repair.');
            const updatedRepair = await response.json();

            setRepairs((prevRepairs) => {
                if (editMode) {
                    return prevRepairs.map((repair) => repair.serviceId === currentRepairId ? updatedRepair : repair);
                } else {
                    return [...prevRepairs, updatedRepair];
                }
            });

            setNewRepair({ name: '', price: '', description: '' });
            setImageFile(null);
            setEditMode(false);
            setCurrentRepairId(null);
        } catch (err) {
            console.error(err);
            setError('Failed to save repair. Please try again.');
        }
    };

    const deleteRepairCard = async (serviceId) => {
        try {
            const response = await fetch(`http://localhost:8080/repairs/${serviceId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete repair.');
            setRepairs(repairs.filter(repair => repair.serviceId !== serviceId));
            setSuccessMessage('Repair deleted successfully!');
        } catch (err) {
            console.error(err);
            setError('Failed to delete repair. Please try again.');
        }
    };

    const startEditing = (repair) => {
        setNewRepair({ name: repair.name, price: repair.price, description: repair.description });
        setCurrentRepairId(repair.serviceId);
        setEditMode(true);
        setSuccessMessage('');
        setError('');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Repairs</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repairs.map((repair) => (
                    <div key={repair.serviceId} className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
                        <img
                            className="w-full h-48 object-cover"
                            src={repair.image ? `data:image/jpeg;base64,${repair.image}` : 'https://via.placeholder.com/150'}
                            alt={repair.name}
                        />
                        <div className="p-4">
                            <h2 className="font-bold text-xl mb-2">{repair.name}</h2>

                            <p className="text-gray-700 mb-2">Cost: ${repair.price}</p>
                            <p className="text-gray-600">{repair.description}</p>
                        </div>
                        <div className="flex justify-between items-center p-4">
                            <button onClick={() => deleteRepairCard(repair.serviceId)} className="text-red-500">
                                <DeleteOutlined /> Delete
                            </button>
                            <button onClick={() => startEditing(repair)} className="text-blue-500">
                                <EditOutlined /> Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-bold">{editMode ? 'Edit Repair' : 'Add New Repair'}</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newRepair.name}
                    onChange={(e) => setNewRepair({ ...newRepair, name: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newRepair.price}
                    onChange={(e) => setNewRepair({ ...newRepair, price: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <textarea
                    placeholder="Description"
                    value={newRepair.description}
                    onChange={(e) => setNewRepair({ ...newRepair, description: e.target.value })}
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
                <button
                    onClick={handleRepairSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {editMode ? 'Update Repair' : 'Add Repair'}
                </button>
            </div>
        </div>
    );
};

export default RepairPage;
