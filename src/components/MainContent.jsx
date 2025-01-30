import React from "react";
import { useNavigate } from "react-router-dom";

function MainContent() {
  const navigate = useNavigate();

  return (
    <main className="main">
      <div className="background">
        <div className="content">
          <h1>
            Think it, <br />
            Taste it, <br />
            Make Memories.
          </h1>
          <button className="book-table" onClick={() => navigate('/login')}>Book Table</button>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
