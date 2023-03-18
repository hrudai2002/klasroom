const express = require("express");
const router = express.Router();

const {
  getAllResources,
  getFilteredResources,
  addResource,
  getById,
  updateResource,
  deleteResource,
} = require("../controllers/resource.controller");

router.get("/", getAllResources);
router.post("/filter", getFilteredResources);
router.post("/", addResource);
router.get("/:id", getById);
router.patch("/:id", updateResource);
router.delete("/:id", deleteResource);

module.exports = router;
