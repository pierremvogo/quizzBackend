const sql = require("../../mysql/db.js");

// constructor
const Quizz = (Quizz) => {
  this.title = Quizz.title;
  this.description = Quizz.description;
  this.student_id =  Quizz.student_id;
};

Quizz.create = (newQuizz, result) => {
  sql.query("INSERT INTO quiz SET ?", newQuizz, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created quiz: ", { id: res.insertId, ...newQuizz });
    result(null, { id: res.insertId, ...newQuizz });
  });
};

Quizz.findById = (id, result) => {
  sql.query(`SELECT * FROM quiz WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Quizz: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Quizz with the id
    result({ kind: "not_found" }, null);
  });
};

Quizz.getAll = (title, result) => {
  let query = "SELECT * FROM quiz";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Quizzs: ", res);
    result(null, res);
  });
};

/*Quizz.getAllPublished = result => {
  sql.query("SELECT * FROM quiz WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Quizz: ", res);
    result(null, res);
  });
};*/

Quizz.updateById = (id, Quizz, result) => {
  sql.query(
    "UPDATE quiz SET title = ?, description = ?  WHERE id = ?",
    [Quizz.title, Quizz.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Quizz with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Quizz: ", { id: id, ...Quizz });
      result(null, { id: id, ...Quizz });
    }
  );
};

Quizz.remove = (id, result) => {
  sql.query("DELETE FROM quiz WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Quizz with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Quizz with id: ", id);
    result(null, res);
  });
};

Quizz.removeAll = result => {
  sql.query("DELETE FROM quiz", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Quizzs`);
    result(null, res);
  });
};

module.exports = Quizz;
