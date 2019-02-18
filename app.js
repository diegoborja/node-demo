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
    const { error } = validator.validate(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
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

app.put("/api/courses/:id", (req, res) => {
    const id = req.params.id;
    let course = courses.find(c=> c[id]);
    if (!course) {
        res.status(404).send(`Course with Id: ${id} does not exist`);
        return;
    }
    const { error } = validator.validate(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }
    course[id].name = req.body.name;
    res.send(course);   
});

app.listen(port);