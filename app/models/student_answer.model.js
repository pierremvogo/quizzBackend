const sql = require("../../mysql/db.js");

// constructor
const StudentAnswer = (student_answer) => {
  this.student_fkid = student_answer.student_fkid;
  this.answer_fkid = student_answer.answer_fkid;
  this.answer_text_fk = student_answer.answer_text_fk;
  this.correct = student_answer.correct;
};

StudentAnswer.create = (newStudent, result) => {
  sql.query("INSERT INTO students_answers SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Student Answers: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};

StudentAnswer.getAll = (name, result) => {
    let query = "SELECT * FROM students_answers";
  
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

  StudentAnswer.getStudentByAnswerId = (id, result) => {
    let query = `SELECT id, question_id, answer_text, is_correct FROM answers INNER JOIN students_answers ON id = answer_fkid WHERE student_fkid = ${id}`; 
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Students and answers : ", res);
      result(null, res);
    });
  };

  StudentAnswer.getStudentByAnswerId1 = (id, result) => {
    let query = `SELECT DISTINCT student_id FROM students INNER JOIN students_answers ON student_id = student_fkid INNER JOIN answers ON id = answer_fkid`; 
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Students and answers : ", res);
      result(null, res);
    });
  };

  StudentAnswer.getQuestionByStudentId = (id, result) => {
    let query = `SELECT DISTINCT answer_fkid, answer_text_fk, question_text FROM questions INNER JOIN answers ON questions.id = question_id INNER JOIN students_answers ON answers.id = answer_fkid WHERE student_fkid = ${id} AND question_type = "Q.R.O"`; 
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Students and answers : ", res);
      result(null, res);
    });
  };


  
StudentAnswer.findById = (student_fkid,answer_fkid, result) => {
    sql.query(`SELECT * FROM students_answers WHERE student_fkid = ${student_fkid} AND answer_fkid = ${answer_fkid}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found StudentAnswer: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Student with the id
      result({ kind: "not_found" }, null);
    });
  };

  

StudentAnswer.updateById = (student_fkid,answer_fkid, Student, result) => {
    sql.query(
      "UPDATE students_answers SET correct = ? WHERE student_fkid = ? AND answer_fkid = ?",
      [Student.correct, student_fkid,answer_fkid],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated Student Answer: ", { id: student_fkid, ...Student });
        result(null, { id: student_fkid, ...Student });
      }
    );
  };

  StudentAnswer.remove = (student_fkid,answer_fkid, result) => {
    sql.query("DELETE FROM students_answers WHERE student_fkid = ? AND answer_fkid = ?",student_fkid,answer_fkid, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Student with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted Student with id: ", student_fkid);
      result(null, res);
    });
  };



  module.exports = StudentAnswer;