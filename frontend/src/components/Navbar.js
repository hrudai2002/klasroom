import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="nav-icons container">
          <div>
            <h1 className="navbar-brand text-white" onClick = {() => navigate('/')} style = {{cursor: 'pointer'}}>Exam Guide</h1>
          </div>
          <div style={{ marginBottom: "5px" }}>
            <i
              class="fa fa-book"
              style={{
                color: "#fff",
                fontSize: "20px",
                cursor: "pointer",
                marginRight: "20px",
              }}
              onClick={() => navigate("/")}
              aria-hidden="true"
            ></i>
            <i
              class="fa fa-plus-circle"
              aria-hidden="true"
              style={{
                color: "#fff",
                fontSize: "20px",
                cursor: "pointer",
                marginRight: "20px",
              }}
              onClick={() => navigate("/add")}
            ></i>
            <i
              class="fa fa-question-circle"
              style={{ color: "#fff", fontSize: "20px", cursor: "pointer" }}
              aria-hidden="true"
              onClick={() => navigate("/about")}
            ></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
