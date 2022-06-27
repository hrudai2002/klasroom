import React, { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const fetchData = async (id) => {
  return await axios
    .get(`https://exam-guide-viit.herokuapp.com/${id}`)
    .then((res) => res.data);
};

const ResourcePage = () => {
  const id = useParams().id;
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  const Year = (year) => {
    if (year === 1) return "st";
    if (year === 2) return "nd";
    if (year === 3) return "rd";
    if (year === 4) return "th";
  };

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateRequest = async () => {
    await axios
      .patch(`https://exam-guide-viit.herokuapp.com/${id}`, {
        title: String(data.title),
        year: Number(data.year),
        branch: String(data.branch),
        description: String(data.description),
      })
      .then((res) => res.data)
      .then((data) => setData(data.resource));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateRequest()
      .then(() => setUpdate(false))
      .then(() => navigate(`/`))
  };

  const deleteHandler = async () => {
    return await axios
      .delete(`https://exam-guide-viit.herokuapp.com/${id}`)
      .then((res) => res.data)
      .then(() => navigate("/"));
  };

  useEffect(() => {
    fetchData(id).then((data) => setData(data.resource));
  }, [id]);


  return update ? (
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
              value={data.title}
            />
          </div>
          <div className="add-form-elements">
            <h5>Year</h5>
            <select
              name="year"
              id="year"
              value={data.year}
              onChange={handleChange}
            >
              <option>select...</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Fourth Year</option>
            </select>
          </div>
          <div className="add-form-elements">
            <h5>Branch</h5>
            <select
              name="branch"
              id="branch"
              value={data.branch}
              onChange={handleChange}
            >
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
              value={data.description}
            ></textarea>
          </div>
          <div className="add-form-elements">
            <input
              type="submit"
              onClick={handleSubmit}
              className="add-btn btn btn-primary"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="resource-page">
      <div
        class="alert alert-danger"
        role="alert"
        style={{ marginTop: "10px" }}
      >
        <p>
          You can edit this article using the pencil icon and delete this post
          using the bin icon
          <br />
          Note: Before editing or deleting the article discuss with your fellow
          classmates and then proceed
        </p>
      </div>
      <div>
        <div className="resource-div">
          <h1 className="title">{data.title}</h1>
          <h3 className="tag btn bg-light">
            {data.year} {Year(data.year)} year
          </h3>
          <h3 className="tag btn bg-light">{data.branch}</h3>
          <h3 className="tag btn bg-light" onClick={() => setUpdate(true)}>
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </h3>
          <h3 className="tag btn bg-light" onClick={deleteHandler}>
            <i class="fa fa-trash" aria-hidden="true"></i>
          </h3>

          <p className="desc">
            <ReactMarkdown>{data.description}</ReactMarkdown>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
