import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const ReservationPage = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedHotel, setSelectedHotel] = useState("");
  const [isCityDropdownVisible, setIsCityDropdownVisible] = useState(false);
  const [isHotelDropdownVisible, setIsHotelDropdownVisible] = useState(false);

  const cities = [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Tiruppur", 
    "Kanchipuram", "Dindigul", "Karaikudi", "Thanjavur", "Cuddalore", "Nagapattinam", "Nagercoil", "Hosur", "Krishnagiri", "Ramanathapuram"
  ];

  const hotels = [
    { name: "The Leela Palace", location: "Chennai", rating: 5, status: "open" },
    { name: "ITC Grand Chola", location: "Chennai", rating: 5, status: "open" },
    { name: "Taj Coromandel", location: "Chennai", rating: 5, status: "open" },
    { name: "Hyatt Regency Chennai", location: "Chennai", rating: 4, status: "open" },
    { name: "Vivanta Coimbatore", location: "Coimbatore", rating: 4, status: "open" },
    { name: "Le Meridien Coimbatore", location: "Coimbatore", rating: 4, status: "open" },
    { name: "The Residency Towers", location: "Coimbatore", rating: 4, status: "open" },
    { name: "Heritage Madurai", location: "Madurai", rating: 5, status: "open" },
    { name: "The Gateway Hotel Pasumalai", location: "Madurai", rating: 4, status: "open" },
    { name: "Fortune Pandiyan Hotel", location: "Madurai", rating: 3, status: "open" },
    { name: "SRM Hotel", location: "Tiruchirappalli", rating: 4, status: "open" },
    { name: "Sangam Hotel", location: "Tiruchirappalli", rating: 3, status: "open" },
    { name: "Grand Gardenia", location: "Tiruchirappalli", rating: 3, status: "open" },
    { name: "Radisson Salem", location: "Salem", rating: 4, status: "open" },
    { name: "CJ Pallazzio", location: "Salem", rating: 3, status: "open" },
    { name: "Grand Estancia", location: "Salem", rating: 3, status: "open" },
    { name: "The Manohar", location: "Tirunelveli", rating: 4, status: "open" },
    { name: "Hotel TamilNadu", location: "Tirunelveli", rating: 3, status: "open" },
    { name: "The Vellore Fort Hotel", location: "Vellore", rating: 4, status: "open" },
    { name: "Poppys Hotel", location: "Vellore", rating: 3, status: "open" },
    { name: "Sathya Park Inn", location: "Erode", rating: 3, status: "open" },
    { name: "Hotel Annamalai International", location: "Erode", rating: 4, status: "open" },
    { name: "The Shanmugha Hotel", location: "Thoothukudi", rating: 3, status: "open" },
    { name: "Tidel Park", location: "Tiruppur", rating: 4, status: "open" },
    { name: "The District Hotel", location: "Tiruppur", rating: 3, status: "open" },
    { name: "Kanchipuram Residency", location: "Kanchipuram", rating: 3, status: "open" },
    { name: "Hotel Samrat", location: "Dindigul", rating: 4, status: "open" },
    { name: "Karaikudi Hotel", location: "Karaikudi", rating: 3, status: "open" },
    { name: "The Grand Plaza", location: "Thanjavur", rating: 4, status: "open" },
    { name: "Hotel Ideal", location: "Thanjavur", rating: 3, status: "open" },
    { name: "Cuddalore Inn", location: "Cuddalore", rating: 3, status: "open" },
    { name: "Hotel Muthu", location: "Nagapattinam", rating: 3, status: "open" },
    { name: "Nagercoil Heritage Hotel", location: "Nagercoil", rating: 4, status: "open" },
    { name: "Hosur Gateway", location: "Hosur", rating: 4, status: "open" },
    { name: "Krishnagiri Comforts", location: "Krishnagiri", rating: 3, status: "open" },
    { name: "Ramanathapuram Palace", location: "Ramanathapuram", rating: 3, status: "open" }    
  ];

  const tables = [
    { type: "VIP Table", capacity: 4, className: "vip" },
    { type: "Family Table", capacity: 6, className: "family" },
    { type: "Couple Table", capacity: 2, className: "couple" },
    { type: "Conference Table", capacity: 10, className: "conference" }
  ];

  const filteredHotels = hotels.filter((hotel) =>
    selectedCity ? hotel.location === selectedCity : true
  );

  return (
    <>
      <Header />
      <div className="reservation-container">
        <main className="reservation-main">
          <h1>Reservation</h1>
          <div className="dropdown-container">
            <button onClick={() => setIsCityDropdownVisible(!isCityDropdownVisible)}>
              {selectedCity || "Select Your City"}
            </button>
            {isCityDropdownVisible && (
              <div className="dropdown">
                {cities.map((city) => (
                  <div key={city} onClick={() => { setSelectedCity(city); setIsCityDropdownVisible(false); }}>
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedCity && (
            <div className="dropdown-container">
              <button onClick={() => setIsHotelDropdownVisible(!isHotelDropdownVisible)}>
                {selectedHotel || "Select Your Hotel"}
              </button>
              {isHotelDropdownVisible && (
                <div className="dropdown">
                  {filteredHotels.map((hotel) => (
                    <div key={hotel.name} onClick={() => { setSelectedHotel(hotel.name); setIsHotelDropdownVisible(false); }}>
                      {hotel.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {selectedHotel && (
            <div className="table-selection">
              <h2>Select a Table</h2>
              <div className="table-cards" style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px" }}>
                {tables.map((table) => (
                  <div
                    className={`table-card ${table.className}`}
                    key={table.type}
                    onClick={() => navigate("/TableSelection", { state: { table } })}
                  >
                    <p>Capacity: {table.capacity}</p>
                  </div>
                ))}
              </div>
              <div className="table-names" style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "10px" }}>
                {tables.map((table) => (
                  <div key={table.type} className="table-card-name">
                    {table.type}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ReservationPage;
