import React from "react";
import "./WelcomeScreen.css";

const WelcomeScreen = () => {
  return (
    <div className="wel">
      <div className="card-container">
        <div className="card">
          <p>
            Your comfort and care are our top priorities.We provide a serene and
            supportive environment for patients and their families. Our
            facilities are designed to offer the highest level of comfort and
            convenience, ensuring a peaceful stay during your medical journey.
          </p>
        </div>
        <div className="card">
          <p>
            We understand the importance of a restful environment for recovery.
            Our houses are equipped with modern amenities and are located close
            to major medical facilities, making it easy for you to access the
            care you need.
          </p>
        </div>
        <div className="card">
          <p>
            Our dedicated staff is here to assist you with any needs you may
            have. We strive to create a home-like atmosphere where you can focus
            on your health and well-being.
          </p>
        </div>
        <div className="card">
          <p>
            Thank you for choosing Hospital Houses. We are committed to
            providing you with the best possible experience during your stay.
          </p>
        </div>
      </div>
      <button className="learn-more-button">Learn More</button>
    </div>
  );
};

export default WelcomeScreen;
