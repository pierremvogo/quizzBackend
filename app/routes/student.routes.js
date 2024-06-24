module.exports = app => {
  const students = require("../controllers/student.controller.js");

  var router = require("express").Router();

  // Create a new student
  router.post("/create", students.create);

  // Retrieve all students
  router.get("/get", students.findAll);

  // Retrieve all published students
  router.get("/published", students.findAllPublished);

  // Retrieve a single student with id
  router.get("/getById/:id", students.findOne);

  // Update a student with id
  router.put("/update/:id", students.update);

  // Delete a student with id
  router.delete("/delete/:id", students.delete);

  // Delete all students
  router.delete("/deleteAll", students.deleteAll);

  app.use('/api/students', router);
};
