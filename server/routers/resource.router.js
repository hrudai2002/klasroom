const express = require("express");
const router = express.Router();

const {
  getAllResources,
  addResource,
  getById,
  updateResource,
  deleteResource,
} = require("../controllers/resource.controller");

router.get("/", getAllResources);
router.post("/", addResource);
router.get("/:id", getById);
router.patch("/:id", updateResource);
router.delete("/:id", deleteResource);

module.exports = router;
