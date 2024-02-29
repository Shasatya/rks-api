import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { UserModel } from "./models/userModel.js";
// import dotenv from "dotenv";
// dotenv.config();

const app = express();
const port = 4000;
const MONGO_URI =
  "mongodb+srv://samarthsoni824:7985125755@cluster.ns1aida.mongodb.net/rksdb?retryWrites=true&w=majority&appName=Cluster";

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((error) => {
    console.log("Error:", error);
  });

app.post("/createUser", async (req, res) => {
  try {
    const { fullName } = req.body;
    console.log("Received name:", fullName);
    const newUser = new UserModel({ fullName });
    await newUser.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", (req, res) => {
  res.json("RKS App");
});

app.listen(port, () => {
  console.log(`Server is running on http://10.0.2.2:${port}`);
});
