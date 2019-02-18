const validator = require("./validator");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const courses = [];

app.use(express.json());

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    let course = courses.find(c=> c[req.params.id]);
    if (!course) {
        res.status(404).send(`Course with Id: ${req.params.id} does not exist`);
        return;
    } 
    res.send(course);   
});

app.post("/api/courses", (req, res) => {
    let validation = validator.validate(req.body);
    if (validation.error){
        res.status(400).send(validation.error.details[0].message);
        return;
    }
    let map = {};
    let id = Date.now();
    map[id] = {
        id: id,
        name: req.body.name
    }
    courses.push(map);
    res.send(map);
})

app.listen(port);