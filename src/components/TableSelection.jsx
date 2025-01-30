import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const TableSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { table } = location.state; 

  const handleReserve = async (type, capacity) => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    console.log(decodedToken.userId);
    const response = await axios.post("http://localhost:5004/book-table", {
      tableType: type,
      isBooked: true,
      bookingTime: Date.now(),
      userId: decodedToken.userId,
      amount: "500"
    });

    alert("Table Reserved Successfully");
    navigate("/"); 
  };

  return (
    <div className="table-selection-container">
      <h2>Selected Table: {table.name}</h2>
      <div className="table-details">
        <p>Type: {table.type}</p>
        <p>Capacity: {table.capacity} people</p>
        <p>Status: Available</p>
        <button onClick={() => handleReserve(table.type, table.capacity)}>Reserve</button>
      </div>
    </div>
  );
};

export default TableSelection;
