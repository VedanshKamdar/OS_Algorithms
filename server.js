const express = require("express");
const mongoose = require("mongoose");
const Result = require("./models/result");

const app = express();

mongoose.connect("mongodb://localhost/fcfs-simulator", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(express.static("public"));
app.use(express.json());

app.post("/result", async (req, res) => {
  const result = new Result(req.body);

  try {
    await result.save();
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

