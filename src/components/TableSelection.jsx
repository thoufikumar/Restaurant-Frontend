import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const TableSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { table } = location.state;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleReserve = async () => {
    if (!date || !time) {
      alert("Please select both date and time.");
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);
    if (hours < 9 || (hours === 22 && minutes > 0) || hours > 22) {
      alert("Please select a time between 09:00 AM and 10:00 PM.");
      return;
    }

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);

    try {
      await axios.post("http://localhost:5004/book-table", {
        tableType: table.type,
        isBooked: true,
        bookingTime: new Date(`${date}T${time}`).toISOString(),
        userId: decodedToken.userId,
        amount: "500",
      });

      alert("Table Reserved Successfully");
      navigate("/");
    } catch (error) {
      alert("Reservation failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="table-selection-container">
      <h2>Selected Table: {table.name || table.type}</h2>
      <div className="table-details">
        <p>Type: {table.type}</p>
        <p>Capacity: {table.capacity} people</p>
        <p>Status: Available</p>

        <div className="custom-datetime-picker">
          <label htmlFor="reservation-date">Reservation Date</label>
          <input
            type="date"
            id="reservation-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label htmlFor="reservation-time">Reservation Time</label>
          <input
            type="time"
            id="reservation-time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <button onClick={handleReserve}>Reserve</button>
      </div>
    </div>
  );
};

export default TableSelection;
