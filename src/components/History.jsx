import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './History.css';
import axios from 'axios';
import Header from './Header';

const History = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const history = Array.isArray(location.state?.history) ? location.state.history : [];

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updatedTable, setUpdatedTable] = useState({});
    const [updatedTableType, setUpdatedTableType] = useState("");
    const [updatedAmount, setUpdatedAmount] = useState("");

    const handleUpdateClick = (table) => {
        setUpdatedTable(table);
        setUpdatedTableType(table.tableType);
        setUpdatedAmount(table.amount);
        setIsUpdateModalOpen(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5004/update-history/${updatedTable._id}`, {
                tableType: updatedTableType,
                amount: updatedAmount
            });

            if (response.status === 200) {
                setIsUpdateModalOpen(false);
                console.log(response.data);
                navigate("/history", { state: { history: [response.data] } });
            }
        } catch (err) {
            console.error("Error updating table:", err);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5004/delete-history/${id}`);

            if (response.status === 200) {
                const updatedHistory = history.filter((table) => table._id !== id);
                navigate("/history", { state: { history: updatedHistory } });
            }
        } catch (err) {
            console.error("Error deleting table:", err);
        }
    };

    return (
        <div>
            <Header />

            <div className="history-container">
                <h2></h2>

                {history.length === 0 ? (
                    <p>No reserved tables found.</p>
                ) : (
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Table Type</th>
                                <th>Booking Time</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((table) => (
                                <tr key={table._id}>
                                    <td>{table.tableType}</td>
                                    <td>{new Date(table.bookingTime).toLocaleString()}</td>
                                    <td>{table.amount}</td>
                                    <td>{table.isBooked ? 'Booked' : 'Available'}</td>
                                    <td>
                                        <button onClick={() => handleUpdateClick(table)}>Update</button>
                                        <button onClick={() => handleDeleteClick(table._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {isUpdateModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Update Table</h3>
                            <form onSubmit={handleUpdateSubmit}>
                                <div className="input">
                                    <label htmlFor="tableType">Table Type</label>
                                    <select
                                        id="tableType"
                                        value={updatedTableType}
                                        onChange={(e) => setUpdatedTableType(e.target.value)}
                                    >
                                        <option value="Couple Table 001">Couple Table 001</option>
                                        <option value="Family Table 002">Family Table 002</option>
                                        <option value="Conference Table 003">Conference Table 003</option>
                                        <option value="VIP Table 004">VIP Table 004</option>
                                        <option value="VIP Table 005">VIP Table 005</option>

                                    </select>
                                </div>

                                <button type="submit">Update</button>
                                <button type="button" onClick={() => setIsUpdateModalOpen(false)}>
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
