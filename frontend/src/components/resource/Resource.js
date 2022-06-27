import React from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/card.css";

const Resource = (props) => {
  const { _id, title, year, branch} = props.resource;
  const imgprop = {
    cyan: "https://assets.codepen.io/2301174/icon-supervisor.svg",
    red: "https://assets.codepen.io/2301174/icon-team-builder.svg",
    blue: "https://assets.codepen.io/2301174/icon-calculator.svg",
    orange: "https://assets.codepen.io/2301174/icon-karma.svg",
  };
  const navigate = useNavigate();
  const Year = (year) => {
    if (year === 1) return "st";
    if (year === 2) return "nd";
    if (year === 3) return "rd";
    if (year === 4) return "th";
  };

  const color = () => {
    if (branch === "Computer Science and Engineering") return "blue";
    if (branch === "Electrical and Communication Engineering") return "orange";
    if (branch === "Electrical and Electronics Engineering") return "red";
    if (branch === "Mechanical Engineering") return "cyan";
  };

  const img = () => {
    if (branch === "Computer Science and Engineering") return imgprop.blue;
    if (branch === "Electrical and Communication Engineering") return imgprop.orange;
    if (branch === "Electrical and Electronics Engineering") return imgprop.red;
    if (branch === "Mechanical Engineering") return imgprop.cyan;
  }

  const navigateResourcePage = () => {
    navigate(`/${_id}`);
  };
  return (
    <div className="row2-container">
        <div className={`box ${color()}`} onClick = {navigateResourcePage} style = {{cursor: 'pointer'}}>
          <h2>{title}</h2>
          <p>
            {year}{Year(year)} Year
          </p>
          <p>{branch}</p>
          <img src={img()} alt="" />
        </div>
    </div>
  );
};

export default Resource;
