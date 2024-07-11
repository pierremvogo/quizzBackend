const Quizz = require("../models/quizz.model.js");

// Create and Save a new Quizz
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Quizz
  const Quizzs = {
    title: req.body.title,
    description: req.body.description
  };

  // Save Quizz in the database
  Quizz.create(Quizzs, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Quizz."
      });
    else res.send(data);
  });
};

// Retrieve all Quizzs from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Quizz.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Quizzs."
      });
    else res.send(data);
  });
};

exports.findAllByPagination = (req, res) => {
  const title = req.query.title;
  const offset = req.params.offset
  Quizz.getAllByPagination(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Quizzs."
      });
    else res.send(data);
  },offset);
};

exports.findCountQuiz = (req, res) => {
  Quizz.getCountQuizz((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while Count Quizzs."
      });
    else res.send(data);
  });
};

// Find a single Quizz by Id
exports.findOne = (req, res) => {
  Quizz.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Quizz with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Quizz with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Quizzs
exports.findAllPublished = (req, res) => {
  Quizz.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Quizzs."
      });
    else res.send(data);
  });
};

// Update a Quizz identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const Quizzs = {
    title: req.body.title,
    description: req.body.description
  };
  console.log(req.body);

  Quizz.updateById(
    req.params.id,
    Quizzs,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Quizz with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Quizz with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Quizz with the specified id in the request
exports.delete = (req, res) => {
  Quizz.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Quizz with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Quizz with id " + req.params.id
        });
      }
    } else res.send({ message: `Quizz was deleted successfully!` });
  });
};

// Delete all Quizzs from the database.
exports.deleteAll = (req, res) => {
  Quizz.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Quizzs."
      });
    else res.send({ message: `All Quizzs were deleted successfully!` });
  });
};
