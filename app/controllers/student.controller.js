const Student = require("../models/student.model.js");

// Create and Save a new Student
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Student
  const Students = {
    student_number: req.body.student_number,
    name: req.body.name,
    surname: req.body.surname
  };

  // Save Student in the database
  console.log("STUDENT ::::::::::::::::::: ", JSON.stringify(Students))
  Student.create(Students, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student."
      });
    else res.send(data);
  });
};

// Retrieve all Students from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Student.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Students."
      });
    else res.send(data);
  });
};

// Find a single Student by Id
exports.findOne = (req, res) => {
  Student.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Student with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Students
exports.findAllPublished = (req, res) => {
  Student.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Students."
      });
    else res.send(data);
  });
};

// Update a Student identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const Students = {
    student_number: req.body.student_number,
    name: req.body.name,
    surname: req.body.surname
  };

  console.log(req.body);

  Student.updateById(
    req.params.id,
    Students,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Student with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
  Student.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Student with id " + req.params.id
        });
      }
    } else res.send({ message: `Student was deleted successfully!` });
  });
};

// Delete all Students from the database.
exports.deleteAll = (req, res) => {
  Student.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Students."
      });
    else res.send({ message: `All Students were deleted successfully!` });
  });
};
