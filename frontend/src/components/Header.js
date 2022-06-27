import React from "react";
import "./../styles/index.css";
import Filter from './Filter';
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();
  const navigateToAddResource = () => {
    navigate("/add");
  };
  return (
    <>
      <div style={{ backgroundColor: "#F5F5F5" }}>
        <div className="container">
          <div className="header-context">
            <div>
              <h1 className="display-1" style={{ marginBottom: "15px" }}>
                Exam Guide
              </h1>
              <p>🔷 Now Preparing for exam is easy</p>
              <p>🔷 Share your resources with your friends </p>
              <div className="header-button">
                <button
                  className="btn btn-outline-primary"
                  style={{ fontSize: "20px", margin: "0 auto" }}
                  onClick={navigateToAddResource}
                >
                  Add Resource 📤
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Filter />
    </>
  );
};

export default Header;
