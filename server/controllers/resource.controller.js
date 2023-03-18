const Resource = require("../model/resource.model");
const {
  getResources,
  FilteredResources,
  getResourceById
  } = require('../services/resource.service')

const getAllResources = async (req, res) => {
  try {
     const data = await getResources();
     return res.status(200).send({ data, success: true, message: "success"});
  } catch (err) {
    return res.status(404).send({data: [], success: false, message: err,})
  }
};

const getFilteredResources = async (req, res) => {
  try {
    const year = req.body.year; 
    const branch = req.body.branch;

    const data = await FilteredResources(year, branch);

    return res.status(200).send({ data, success: true, message: "success" })
  } catch (error) {
    return res.status(404).send({ data: [], success: false, message: error })
  }
}

const addResource = async (req, res) => {
  try {
    const { title, year, branch, description, user } = req.body;
    await Resource.create({ title, year, branch, description, date: new Date(), user}) 
    return res.status(200).send({ data: [], success: true, message: "success"})
  } catch (err) {
    return res.status(500).send({ data: [], success: false, message: err.message,})
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getResourceById(id);
    return res.status(200).send({ data, success: true, message: 'success'})
  } catch (err) {
    return res.status(500).json({ data: [], success: false, message: err})
  }
};

const updateResource = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, year, branch, description } = req.body;
    let data = await Resource.findByIdAndUpdate(id, { title, year, branch, description});
    data = await data.save();
    return res.status(200).send({ data, success: true, message: 'success'})
  } catch (err) {
    return res.status(500).send({data: [], success: false, message: err})
  }
};

const deleteResource = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Resource.findByIdAndRemove(id);
    return res.status(200).send({ data, success: true, message: 'success'})
  } catch (err) {
    return res.status(404).send({data: [], success: false, message: err})
  }
};

module.exports = {
  getAllResources, 
  getFilteredResources,
  addResource, 
  getById, 
  updateResource, 
  deleteResource
}