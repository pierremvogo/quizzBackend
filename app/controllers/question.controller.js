const Question = require("../models/question.model.js");

// Create and Save a new Question
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Question
  const Question = new Question({
    question_text: req.body.question_text
  });

  // Save Question in the database
  Question.create(Question, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Question."
      });
    else res.send(data);
  });
};

// Retrieve all Questions from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Question.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Questions."
      });
    else res.send(data);
  });
};

// Find a single Question by Id
exports.findOne = (req, res) => {
  Question.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Question with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Question with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Questions
exports.findAllPublished = (req, res) => {
  Question.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Questions."
      });
    else res.send(data);
  });
};

// Update a Question identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Question.updateById(
    req.params.id,
    new Question(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Question with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Question with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
  Question.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Question with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Question with id " + req.params.id
        });
      }
    } else res.send({ message: `Question was deleted successfully!` });
  });
};

// Delete all Questions from the database.
exports.deleteAll = (req, res) => {
  Question.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Questions."
      });
    else res.send({ message: `All Questions were deleted successfully!` });
  });
};
