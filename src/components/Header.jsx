import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


function Header() {
  const [username, setUsername] = useState("Guest");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken?.name || "Guest");

        // Save userId in localStorage for global access
        if (decodedToken?.id) {
          localStorage.setItem("userId", decodedToken.id);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setUsername("Guest");
        localStorage.removeItem("userId");
      }
    }
  }, []);

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure about Logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/");
    }
  };

  const handleHistoryClick = async () => {
    const storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
      console.error("User ID not found in localStorage");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5004/history/${storedUserId}`);
      const data = await response.json();

      if (response.ok) {
        navigate("/history", { state: { history: data } });
      } else {
        console.error("Failed to fetch history:", data.message);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        Bookd
      </Link>
      <nav className="nav">
        <Link to="/about">About</Link>
        {username !== "Guest" && (
          <button className="nav-button history" onClick={handleHistoryClick}>
            History
          </button>
        )}
        <Link to={username !== "Guest" ? "/profile" : "/login"}>
          {username !== "Guest" ? username : "Login"}
        </Link>
        <button className="nav-button logout" onClick={logout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
