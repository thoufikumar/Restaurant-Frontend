import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
function Header() {
  const [username, setUsername] = useState("Guest");
const navigate=useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token"); 

    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        setUsername(decodedToken?.name || "Guest"); 
      } catch (error) {
        console.error("Invalid token:", error);
        setUsername("Guest"); 
      }
    }
  }, []);
  const logout=()=>{
    alert("Are you sure about Logout ?")
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header className="header">
      <Link to="/" className="logo">
        Bookd
      </Link>
      <nav className="nav">
        <Link to="/about">About</Link>
        <Link to={username !== "Guest" ? "/profile" : "/login"}>
          {username !== "Guest" ? username : "Login"}
        </Link>
        <button onClick={logout}>Logout</button>
      </nav>
    </header>
  );
}

export default Header;
