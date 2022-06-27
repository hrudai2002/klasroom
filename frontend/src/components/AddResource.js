import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddResource = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    year: "",
    branch: "",
    description: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    await axios
      .post("https://exam-guide-viit.herokuapp.com/", {
        title: String(inputs.title),
        year: Number(inputs.year),
        branch: String(inputs.branch),
        description: String(inputs.description),
      })
      .then((res) => res.data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/"));
  };
  return (
    <div className="add-resource">
      <div style={{ backgroundColor: "#f5f5f5", padding: "30px" }}>
        <h1 style={{ textAlign: "center" }}>Resource 📤</h1>
        <form className="add-form" onSubmit={handleSubmit}>
          <div className="add-form-elements">
            <h5>Title</h5>
            <input
              type="text"
              name="title"
              placeholder=" Title.."
              onChange={handleChange}
              required
            />
          </div>
          <div className="add-form-elements">
            <h5>Year</h5>
            <select name="year" id="year" onChange={handleChange} required>
              <option>select...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="add-form-elements">
            <h5>Branch</h5>
            <select name="branch" onChange={handleChange} required>
              <option>select...</option>
              <option value="Computer Science and Engineering">
                Computer Science and Engineering
              </option>
              <option value="Electrical and Communication Engineering">
                Electrical and Communication Engineering
              </option>
              <option value="Electrical and Electronics Engineering">
                Electrical and Electronics Engineering
              </option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
            </select>
          </div>
          <div className="add-form-elements">
            <h5>
              Description{" "}
              <span style={{ fontSize: "15px" }}>
                ( use markdown{" "}
                <a
                  href="https://wordpress.com/support/markdown-quick-reference/"
                  style={{ textDecoration: "none" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  know more
                </a>
                )
              </span>
            </h5>
            <textarea
              type="text"
              name="description"
              placeholder=" Description..."
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="add-form-elements">
            <input
              type="submit"
              className="add-btn btn btn-primary"
              value="Submit"
            />
          </div>
          <div className="add-form-elements add-alert alert alert-success">
            <p>
              Share the resource which you feel helpful and don't share any
              unnecessary stuff here.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResource;
