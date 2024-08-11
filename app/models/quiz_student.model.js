const sql = require("../../mysql/db.js");

// constructor
const QuizStudent = (student_quiz) => {
  this.student_fkid = student_quiz.student_fkid;
  this.quiz_fkid = student_quiz.quiz_fkid;
};

QuizStudent.create = (newStudent, result) => {
  sql.query("INSERT INTO students_quiz SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Student Quiz: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};

QuizStudent.getAll = (name, result) => {
    let query = "SELECT * FROM students_quiz";
  
    if (name) {
      query += ` WHERE title LIKE '%${name}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Students: ", res);
      result(null, res);
    });
  };
  
QuizStudent.findById = (student_fkid, quiz_fkid, result) => {
    sql.query(`SELECT * FROM students_quiz WHERE student_fkid = ${student_fkid} AND quiz_fkid = ${quiz_fkid}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found QuizStudent: ", res[0]);
        result(null, res);
        return;
      }
      // not found Student with the id
      result({ kind: "not_found" }, null);
    });
  };

  QuizStudent.findStudentById1 = (student_fkid, quiz_fkid, result) => {
    sql.query(`SELECT * FROM students_quiz INNER JOIN students ON students_quiz.student_fkid = student_id INNER JOIN students_answers ON students_answers.student_fkid = student_id WHERE correct = "pending" AND answer_text_fk != "" AND students_quiz.student_fkid = ${student_fkid} AND students_quiz.quiz_fkid = ${quiz_fkid}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found QuizStudent: ", res[0]);
        result(null, res);
        return;
      }
      // not found Student with the id
      result({ kind: "not_found" }, null);
    });
  };

  

  

  module.exports = QuizStudent;