const QuizStudent = require("../models/quiz_student.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const StudentsQuiz = {
    student_fkid: req.body.student_fkid,
    quiz_fkid: req.body.quiz_fkid,
  };
  console.log("STUDENT_QUIZ ::::::::::::::::::: ", JSON.stringify(StudentsQuiz))
  QuizStudent.create(StudentsQuiz, (err, data) => {
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
    QuizStudent.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Students."
        });
      else res.send(data);
    });
  };


exports.findOne = (req, res) => {
    QuizStudent.findById(req.params.student_fkid, req.params.quiz_fkid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student QuizStudent with student_fkid ${req.params.student_fkid} and quiz_fkid ${req.params.quiz_fkid}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving QuizStudent with student_id " + req.params.student_fkid
          });
        }
      } else res.send(data);
    });
  };

  exports.findOne1 = (req, res) => {
    QuizStudent.findById1(req.params.student_fkid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student QuizStudent with student_fkid ${req.params.student_fkid}`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving QuizStudent with student_id " + req.params.student_fkid
          });
        }
      } else res.send(data);
    });
  };

  exports.findOneStudentQuizz = (req, res) => {
    QuizStudent.findStudentQuizz(req.params.student_fkid, req.body.quizz_fkid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student QuizStudent with student_fkid ${req.params.student_fkid}`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving QuizStudent with student_id " + req.params.student_fkid
          });
        }
      } else res.send(data);
    });
  };

 
