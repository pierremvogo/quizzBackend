const StudentAnswer = require("../models/student_answer.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const StudentsAnswers = {
    student_fkid: req.body.student_fkid,
    answer_fkid: req.body.answer_fkid,
    answer_text_fk: req.body.answer_text_fk,
    correct: req.body.correct
  };
  console.log("STUDENT_ANSWER ::::::::::::::::::: ", JSON.stringify(StudentsAnswers))
  StudentAnswer.create(StudentsAnswers, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    StudentAnswer.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Students."
        });
      else res.send(data);
    });
  };

  exports.findStudentByAnswerId = (req, res) => {
    const id = req.params.id;
    const idquiz = req.params.idquiz;
    StudentAnswer.getStudentByAnswerId(id,idquiz,(err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Answer for  Students."
        });
      else res.send(data);
    });
  };

  exports.findStudentByAnswerId1 = (req, res) => {
    const id = req.params.id;
    StudentAnswer.getStudentByAnswerId1(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Answer for  Students."
        });
      else res.send(data);
    });
  };

  exports.findQuestionByStudentId = (req, res) => {
    const id = req.params.id;
    const id_quiz = req.params.id_quiz
    StudentAnswer.getQuestionByStudentId(id,id_quiz, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Answer for  Students."
        });
      else res.send(data);
    });
  };

exports.findOne = (req, res) => {
    StudentAnswer.findById(req.params.student_fkid,req.params.answer_fkid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student StudentAnswer with student_fkid ${req.params.student_fkid}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving StudentAnswer with student_id " + req.params.student_fkid
          });
        }
      } else res.send(data);
    });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const StudentsAnswers = {
        correct: req.body.correct
      };
    console.log(req.body);
    
    StudentAnswer.updateById(
      req.params.student_fkid,
      req.params.answer_fkid,
      StudentsAnswers,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Student Answer with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Student Answer with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    StudentAnswer.remove(req.params.student_fkid,req.params.answer_fkid, (err, data) => {
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