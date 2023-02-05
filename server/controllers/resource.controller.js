const Resource = require("../model/resource.model");

const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
     return res.status(200).send({
       data: resources,
       success: true,
       message: "success",
     });
  } catch (err) {
    return res.status(404).send({
      data: [],
      success: false,
      message: err,
    })
  }
};

const addResource = async (req, res) => {
  try {
    const { title, year, branch, description, user } = req.body;
    const resource = new Resource({
      title,
      year,
      branch,
      description,
      user
    });
    await resource.save(); 
    return res.status(200).send({
      data: resource, 
      success: true, 
      message: "success"
    })
  } catch (err) {
    return res.status(500).send({
      data: [], 
      success: false, 
      message: err,
    })
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const resource = await Resource.findById(id);
    return res.status(200).send({
      data: resource, 
      success: true, 
      message: 'success'
    })
  } catch (err) {
    return res.status(500).json({
      data: [], 
      success: false, 
      message: err,
    })
  }
};

const updateResource = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, year, branch, description } = req.body;
    let resource = await Resource.findByIdAndUpdate(id, {
      title,
      year,
      branch,
      description,
    });
    resource = await resource.save();
    return res.status(200).send({
      data: resource, 
      success: true, 
      message: 'success',
    })
  } catch (err) {
    return res.status(500).send({
      data: [], 
      success: false, 
      message: err
    })
  }
};

const deleteResource = async (req, res) => {
  try {
    const id = req.params.id;
    const resource = await Resource.findByIdAndRemove(id);
    return res.status(200).send({
      data: resource, 
      success: true, 
      message: 'success'
    })
  } catch (err) {
    return res.status(404).send({
      data: [], 
      success: false, 
      message: err
    })
  }
};

module.exports = {
  getAllResources, 
  addResource, 
  getById, 
  updateResource, 
  deleteResource
}