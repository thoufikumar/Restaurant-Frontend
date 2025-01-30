import React, { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const Signup = () => {
  const [firstname,setFirstname]=useState("");
  const [lastname,setLastname]=useState("");
  const [gender,setgender]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log({
      firstname,
      lastname,
      gender,
      email,
      password
    });
  
    try {
      const req = await axios.post("https://restaurant-backend-1-petz.onrender.com/register", {
        firstname,
        lastname,
        gender,
        email,
        password
      });
  
      console.log("Response:", req.data);
      if (req.data.isvalid) {
        alert("Account created successfully!");
        navigate('/login');
      } else {
        alert("Account creation failed!");
      }
  
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
    }
  
  } 
  
  return (
    <div className="signup-container">
      <Header /> 
      <div className="signup">
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" name="firstname" onChange={(event)=>setFirstname(event.target.value)} placeholder="Enter your first name" required />
        </div>
        <div className="input">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" name="lastname"onChange={(event)=>setLastname(event.target.value)} placeholder="Enter your last name" required />
        </div>
        <div className="input">
          <label htmlFor="gender">Gender</label>
          <input type="text" id="gender" name="gender" onChange={(event)=>setgender(event.target.value)} placeholder="Enter your Gender" required />
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={(event)=>setEmail(event.target.value)} placeholder="Enter your email" required />
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(event)=>setPassword(event.target.value)} placeholder="Enter your password" required />
        </div>
        <button type="submit">Submit</button>
      </form>
              <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
