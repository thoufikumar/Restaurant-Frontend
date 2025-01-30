import React, { useEffect, useState } from "react";
import Header from "./Header"; 

function AboutUs() {
  const totalImages = 3;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 2000);
    return () => clearInterval(interval); 
  }, [totalImages]);

  const currentClass = `image-container image-${currentIndex + 1}`;

  return (
    <div className="about-container">
      <Header /> 
      <main className="about-main">
        <div className="left-block">
          <div className={currentClass}></div>
        </div>
        <div className="right-block">
          <div className="about-text">
            <h2 className="about-title">About Us</h2>
            <p>
              Our restaurant reservation system is designed to offer a seamless and user-friendly experience for both guests and staff.
               With just a few clicks, customers can easily book a table for their desired time and date,
                ensuring that they never miss out on a dining experience. The system provides real-time availability, 
                allowing users to choose from a variety of seating options based on their preferences.
                 Additionally, it sends automated confirmations and reminders, so there’s no risk of forgetting a reservation.Whether for a special occasion or a casual meal, 
                 our reservation system ensures convenience, efficiency, and satisfaction every time.
            </p>
          </div>
          <div className="mission-statement">
            <h3>Our Mission</h3>
            <p>
              Our mission is to provide high-quality products and services that not
              only meet the needs of our customers but exceed their expectations. We
              strive to innovate continuously and build strong, lasting relationships
              with our clients.
            </p>
          </div>
          <div className="team">
            <h3>Meet Our Team</h3>
            <p>
              Our team consists of passionate and skilled professionals dedicated to
              creating the best solutions for our clients. From designers to
              developers, we work together to turn ideas into reality.
            </p>
          </div>
          <div className="contact-info">
            <h3>Contact Us</h3>
            <p>Email: contact@yourcompany.com</p>
            <p>Phone: +1 (234) 567-890</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AboutUs;
