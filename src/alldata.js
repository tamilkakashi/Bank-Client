import { useState } from "react";
import axios from "axios";
import "./alldata.css";  // Import the CSS file
import React from "react";

export default function Alldata() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", amount: "" });

  async function fetchData(e) {
    e.preventDefault();
    try {
      let result = await axios.get("https://bank-server-1-jf4n.onrender.com/data");
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`https://bank-server-1-jf4n.onrender.com/delete/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  }

  function handleEdit(item) {
    setEditId(item._id);
    setFormData({ name: item.name, email: item.email, password: item.password, amount: item.amount });
  }

  async function handleUpdate() {
    try {
      await axios.put(`https://bank-server-1-jf4n.onrender.com/update/${editId}`, formData);
      setData((prevData) =>
        prevData.map((item) => (item._id === editId ? { ...item, ...formData } : item))
      );
      setEditId(null);
    } catch (error) {
      console.error("Error updating:", error);
    }
  }

  return (
    <div className="alldata-container">
      <h1 className="alldata-heading">USER DATA</h1>

      <button className="fetch-btn" onClick={fetchData}>Fetch Data</button>

      {data.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>${item.amount}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">No data available. Click "Fetch Data" to load.</p>
      )}

      {editId && (
        <div className="edit-form">
          <h2>Edit User</h2>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" />
          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" />
          <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Password" />
          <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} placeholder="Balance" />
          <button className="update-btn" onClick={handleUpdate}>Update</button>
          <button className="cancel-btn" onClick={() => setEditId(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
