const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const username = require("username-generator");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

let Question = require("./models/question.model");
let Model = require("./models/ml.model");

require("dotenv").config();

app.use(express.static("./client/build"));
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.get("/random-question", (req, res) => {
  Question.count().exec((err, count) => {
    var random = Math.floor(Math.random() * count);

    Question.findOne()
      .skip(random)
      .exec((err, question) => {
        res.json(question);
      });
  });
});

app.post("/random-question", async (req, res) => {
  try {
    const { category, picture, translation } = req.body;
    const newQuestion = new Question({ category, picture, translation });
    console.log(newQuestion);
    await newQuestion.save();
    res.status(200).send();
  } catch {
    res.status(400).send(err);
  }
});

app.post("/user-model", async (req, res) => {
  Model.findOne({ username: req.body.username })
    .then((model) => res.json(model))
    .catch((err) => res.status(400).son("Error " + err));
});

app.post("/upload-model", async (req, res) => {
  try {
    const { username, model, classes } = req.body;
    const newModel = new Model({ username, model, classes });
    console.log(newModel);
    await newModel.save();
    res.status(200).send();
  } catch {
    res.status(400).send(err);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("client", "build", "index.html"));
});

const users = {};

io.on("connection", (socket) => {
  //generate username against a socket connection and store it
  const userid = username.generateUsername("-");
  if (!users[userid]) {
    users[userid] = socket.id;
  }
  //send back username
  socket.emit("yourID", userid);
  io.sockets.emit("allUsers", users);

  socket.on("disconnect", () => {
    delete users[userid];
  });

  socket.on("callUser", (data) => {
    io.to(users[data.userToCall]).emit("hey", {
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on("acceptCall", (data) => {
    io.to(users[data.to]).emit("callAccepted", data.signal);
  });

  socket.on("close", (data) => {
    io.to(users[data.to]).emit("close");
  });

  socket.on("rejected", (data) => {
    io.to(users[data.to]).emit("rejected");
  });
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
