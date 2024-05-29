const express = require("express");
const mongoose = require("mongoose");
const db_Url = "mongodb://localhost:27017/";
const bodyParse = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParse.json());
app.use(cors());

mongoose.connect(db_Url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "FS-WebApp",
});

const DB = mongoose.connection;

DB.once("open", () => {
  console.log("Mongoose Connected Successfull");
});

DB.on("error", () => {
  console.error("This Is Error: ");
});

const Schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: Number,
  avatar: String,
});

const modal = mongoose.model("userdata", Schema);

app.post("/post", async (req, res) => {
  const existingUser = await modal.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({ Message: "Email already exists" });
  }
  const Data = new modal({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    avatar: req.body.avatar,
  });
  await Data.save();
  console.log(Data);

  res.status(200).json({ Message: "SignUp Successfull" });
});

app.get("/get", async (req, res) => {
  const backEndData = await modal.find();
  res.status(200).json({ result: backEndData });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await modal.findOne({ email: email });
  if (!user) {
    res.status(404).json({ Message: "Email Not Found" });
  }
  if (password === user?.password) {
    const userData = {
      id: user._id,
      name: user.name,
      avatar: user.avatar,
    };
    res.status(200).json({ Message: "Login Successfull", return: userData });
  }
});

app.put("/put", async (req, res) => {
  const Update = await modal.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      avatar: req.body.avatar,
    },
    { new: true }
  );
  res.status(200).json({ Message: "Successfully Updated" });
  console.log(Update);
});
app.delete("/delete", async (req, res) => {
  const Delete = await modal.findByIdAndDelete(req.body.id);
  console.log(Delete);
  res.status(200).json({ Message: "Successfully Deleted" });
});

app.listen(2000, () => {
  console.log("Server Running On Port 2000");
});
