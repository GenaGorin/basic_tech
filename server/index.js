require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const router = require("./routes/index");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "images")));
app.use(fileUpload({}));

app.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://" +
        process.env.DB_USERNAME +
        ":" +
        process.env.DB_PASSWORD +
        "@cluster0.804v7wi.mongodb.net/" +
        process.env.DB_NAME +
        "?retryWrites=true&w=majority"
    );
    app.listen(PORT, () => console.log(" server start on ", PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
