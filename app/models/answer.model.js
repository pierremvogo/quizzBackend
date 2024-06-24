const sql = require("../../mysql/db.js");

// constructor
const Student = function(student) {
  this.title = student.title;
  this.description = student.description;
  this.published = student.published;
};

Student.create = (newstudent, result) => {
  sql.query("INSERT INTO Students SET ?", newstudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Student: ", { id: res.insertId, ...newstudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};

Student.findById = (id, result) => {
  sql.query(`SELECT * FROM Students WHERE id = ${id}`, (err, res) => {
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

Student.getAll = (title, result) => {
  let query = "SELECT * FROM Students";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
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
  sql.query("SELECT * FROM Students WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Students: ", res);
    result(null, res);
  });
};

Student.updateById = (id, Student, result) => {
  sql.query(
    "UPDATE Students SET title = ?, description = ?, published = ? WHERE id = ?",
    [Student.title, Student.description, Student.published, id],
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
  sql.query("DELETE FROM Students WHERE id = ?", id, (err, res) => {
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
  sql.query("DELETE FROM Students", (err, res) => {
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
