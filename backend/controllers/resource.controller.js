const Resource = require("../model/resource.model");

const getAllResources = async (req, res) => {
  let resources;
  try {
    resources = await Resource.find();
  } catch (err) {
    console.log(err);
  }
  if (!resources) {
    return res.status(404).json({ message: "No Resource Found" });
  }
  return res.status(200).json({ resources });
};

const addResource = async (req, res) => {
  const { title, year, branch, description } = req.body;
  let resource;
  try {
    resource = new Resource({
      title,
      year,
      branch,
      description,
    });
    await resource.save();
  } catch (err) {
    console.log(err);
  }
  if (!resource) {
    return res.status(500).json({ message: "unable to add" });
  }
  return res.status(200).json({ resource });
};

const getById = async (req, res) => {
  const id = req.params.id;
  let resource;
  try {
    resource = await Resource.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!resource) {
    return res.status(500).json({ message: "No Resource Found" });
  }
  return res.status(200).json({ resource });
};

const updateResource = async (req, res) => {
  const id = req.params.id;
  const { title, year, branch, description } = req.body;
  let resource;
  try {
    resource = await Resource.findByIdAndUpdate(id, {
      title,
      year,
      branch,
      description,
    });
    resource = await resource.save();
  } catch (err) {
    console.log(err);
  }
  if (!resource) {
    return res.status(500).json({ message: "No Resource Found" });
  }
  return res.status(200).json({ resource });
};

const deleteResource = async (req, res) => {
  const id = req.params.id;
  let resource;
  try {
    resource = await Resource.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!resource) {
    return res.status(404).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};

module.exports = {
  getAllResources,
  addResource,
  getById,
  updateResource,
  deleteResource,
};
