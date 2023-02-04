const express = require("express");
const mongoose = require("mongoose");
const router = require("./routers/resource.router");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/resource", router);

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Info : connected to database"))
  .then(() => {
    app.listen(port, () => {
      console.log(`Info : Server is listening on ${port}`);
    });
  })
  .catch((err) => console.log(err));
