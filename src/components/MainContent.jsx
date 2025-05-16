import React from "react";
import { useNavigate } from "react-router-dom";

function MainContent() {
  const navigate = useNavigate();

  const handleBookTable = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/reservation");
    } else {
      navigate("/login");
    }
  };

  return (
    <main className="main">
      <div className="background">
        <div className="content">
          <h1>
            Flavors That Stay,<br />
            Memories That Last <br />
          </h1>
          <button className="book-table" onClick={handleBookTable}>
            Book Table
          </button>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
