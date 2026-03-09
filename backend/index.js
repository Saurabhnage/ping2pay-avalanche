const express = require("express");
require("dotenv").config();

require("./bot");

const app = express();

app.get("/", (req, res) => {
  res.send("Ping2Pay API running");
});

app.listen(3000, () => {
  console.log("Ping2Pay server running on port 3000");
});
