import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '', price: '', quantity: '', category: '', image: '', brand: '', model: '' });
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/items');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingItem) {
            setEditingItem({ ...editingItem, [name]: value });
        } else {
            setNewItem({ ...newItem, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingItem) {
            await updateItem(editingItem);
        } else {
            await addItem(newItem);
        }
    };

    const addItem = async (item) => {
        try {
            await axios.post('http://localhost:8080/items', item);
            fetchItems();
            setNewItem({ name: '', description: '', price: '', quantity: '', category: '', image: '', brand: '', model: '' });
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const updateItem = async (item) => {
        try {
            await axios.put(`http://localhost:8080/items/${item.itemId}`, item);
            fetchItems();
            setEditingItem(null);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/items/${id}`);
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEdit = (item) => {
        setEditingItem({ ...item });
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Product Items</h1>

            {/* Add or Edit Item Form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <h3>{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={editingItem ? editingItem.name : newItem.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={editingItem ? editingItem.description : newItem.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={editingItem ? editingItem.price : newItem.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={editingItem ? editingItem.quantity : newItem.quantity}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        className="form-control"
                        name="category"
                        value={editingItem ? editingItem.category : newItem.category}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="text"
                        className="form-control"
                        name="image"
                        value={editingItem ? editingItem.image : newItem.image}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Brand</label>
                    <input
                        type="number"
                        className="form-control"
                        name="brand"
                        value={editingItem ? editingItem.brand : newItem.brand}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Model</label>
                    <input
                        type="number"
                        className="form-control"
                        name="model"
                        value={editingItem ? editingItem.model : newItem.model}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">{editingItem ? 'Update Item' : 'Add Item'}</button>
                {editingItem && <button type="button" className="btn btn-secondary ml-2" onClick={() => setEditingItem(null)}>Cancel</button>}
            </form>

            {/* Product Table */}
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {items.map(item => (
                    <tr key={item.itemId}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.category}</td>
                        <td>
                            <button className="btn btn-info mr-2" onClick={() => handleEdit(item)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => deleteItem(item.itemId)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
