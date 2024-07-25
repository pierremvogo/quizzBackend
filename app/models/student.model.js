const sql = require("../../mysql/db.js");

// constructor
const Student = (student) => {
  this.student_number = student.student_number;
  this.name = student.name;
  this.surname = student.surname;
};

Student.create = (newStudent, result) => {
  sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Student: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};

Student.findById = (id, result) => {
  sql.query(`SELECT * FROM students WHERE student_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Student: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Student with the id
    result({ kind: "not_found" }, null);
  });
};

Student.findByStudentNumber = (student_number, result) => {
  sql.query(`SELECT * FROM students WHERE student_number = ${student_number}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found Student By name: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Student.getAll = (name, result) => {
  let query = "SELECT * FROM students";

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

Student.getAllByPagination = (name, result, offset) => {
  let query = `SELECT * FROM students LIMIT ${offset}, 10`;

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

Student.getAllPublished = result => {
  sql.query("SELECT * FROM students WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Student: ", res);
    result(null, res);
  });
};

Student.getCountStudent = result => {
  sql.query("SELECT COUNT(*) FROM students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Count Student: ", res);
    result(null, res);
  });
};

Student.updateById = (id, Student, result) => {
  sql.query(
    "UPDATE students SET student_number = ?, name = ?, surname = ?, quiz_id = ? WHERE student_id = ?",
    [Student.student_number, Student.name, Student.surname, Student.quiz_id, id],
    (err, res) => {
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

      console.log("updated Student: ", { id: id, ...Student });
      result(null, { id: id, ...Student });
    }
  );
};
Student.updateQuizId = (id, Student, result) => {
  sql.query(
    "UPDATE students SET quiz_id = ? WHERE student_id = ?",
    [Student.quiz_id, id],
    (err, res) => {
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

      console.log("updated Student: ", { id: id, ...Student });
      result(null, { id: id, ...Student });
    }
  );
};

Student.remove = (id, result) => {
  sql.query("DELETE FROM students WHERE student_id = ?", id, (err, res) => {
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

    console.log("deleted Student with id: ", id);
    result(null, res);
  });
};

Student.removeAll = result => {
  sql.query("DELETE FROM students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Students`);
    result(null, res);
  });
};

module.exports = Student;
