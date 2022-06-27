import React, { useEffect, useState } from "react";
import axios from "axios";
import Resource from "./resource/Resource";

const URL = "https://exam-guide-viit.herokuapp.com/";
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const Filter = () => {
  const [resources, setResources] = useState([]);
  const [newResources, setNewResources] = useState([]);
  const [data, setData] = useState({
    year: "",
    branch: "",
  });
  useEffect(() => {
    fetchHandler().then((data) => {
      setResources(data.resources);
      setNewResources(data.resources);
    });
  }, []);
  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const filterResource = resources.filter((resource) => {
      console.log(resource);
      return (
        resource.year === Number(data.year) && resource.branch === data.branch
      );
    });
    setNewResources(filterResource);
  };
  return (
    <>
      <div className="filter">
        <div className="container">
          <div className="bg-light filter-div">
            <form className="filter-form">
              <div className="year">
                <h4 className="form-text">Year </h4>
                <select name="year" id="year" onChange={handleChange}>
                  <option>select...</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                </select>
              </div>
              <div className="branch">
                <h4 className="form-text"> Branch </h4>
                <select name="branch" id="branch" onChange={handleChange}>
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
                  <option value="mMechanical Engineering">
                    Mechanical Engineering
                  </option>
                </select>
              </div>
            </form>
            <div className="filter-btn">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Submit
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="resources-grid container">
        {newResources.map((resource, id) => {
          return (
            <li key={id}>
              <Resource resource={resource} />
            </li>
          );
        })}
      </div>
    </>
  );
};

export default Filter;
