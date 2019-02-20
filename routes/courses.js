const validator = require("../middleware/validator");
const express = require("express");
const router = express.Router();
const courses = [];

router.get("/", (req, res) => {
    res.send(courses);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    let course = courses.find(c => c[id]);
    if (!course) {
        res.status(404).send(`Course with Id: ${id} does not exist`);
        return;
    }
    res.send(course);
});

router.post("/", (req, res) => {
    const { error } = validator.validate(req.body);
    if (error) {
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

router.put("/:id", (req, res) => {
    const id = req.params.id;
    let course = courses.find(c => c[id]);
    if (!course) {
        res.status(404).send(`Course with Id: ${id} does not exist`);
        return;
    }
    const { error } = validator.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    course[id].name = req.body.name;
    res.send(course);
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    let index = courses.findIndex(c => c[id]);
    if (index < 0) {
        res.status(404).send(`Course with Id: ${id} does not exist`);
        return;
    }
    courses.splice(index, 1);
    res.send(`Course with Id: ${id} has been deleted`);
});

module.exports = router;