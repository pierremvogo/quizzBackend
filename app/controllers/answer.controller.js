const Answer = require("../models/Answer.model.js");

// Create and Save a new Answer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Answer
  const Answers = {
    answer_text: req.body.answer_text,
    is_correct: req.body.is_correct,
    question_id: req.body.question_id,
    student_id: req.body.student_id
  };

  // Save Answer in the database
  Answer.create(Answers, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Answer."
      });
    else res.send(data);
  });
};

// Retrieve all Answers from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Answer.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Answers."
      });
    else res.send(data);
  });
};

// Find a single Answer by Id
exports.findOne = (req, res) => {
  Answer.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Answer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Answer with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Answers
exports.findAllPublished = (req, res) => {
  Answer.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Answers."
      });
    else res.send(data);
  });
};

// Update a Answer identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const Answers = {
    answer_text: req.body.answer_text,
    is_correct: req.body.is_correct,
  };

  Answer.updateById(
    req.params.id,
    Answers,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Answer with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Answer with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Answer with the specified id in the request
exports.delete = (req, res) => {
  Answer.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Answer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Answer with id " + req.params.id
        });
      }
    } else res.send({ message: `Answer was deleted successfully!` });
  });
};

// Delete all Answers from the database.
exports.deleteAll = (req, res) => {
  Answer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Answers."
      });
    else res.send({ message: `All Answers were deleted successfully!` });
  });
};
