const config = require("config");
const express = require("express");
const app = express();
const courses = require("./routes/courses");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/courses", courses);

app.listen(port);