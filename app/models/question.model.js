const sql = require("../../mysql/db.js");

// constructor
const Question = function(Question) {
  this.question_text = Question.question_text;
};

Question.create = (newQuestion, result) => {
  sql.query("INSERT INTO questions SET ?", newQuestion, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Question: ", { id: res.insertId, ...newQuestion });
    result(null, { id: res.insertId, ...newQuestion });
  });
};

Question.findById = (id, result) => {
  sql.query(`SELECT * FROM questions WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Question: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Question with the id
    result({ kind: "not_found" }, null);
  });
};

Question.getAll = (title, result) => {
  let query = "SELECT * FROM questions";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Questions: ", res);
    result(null, res);
  });
};

/*Question.getAllPublished = result => {
  sql.query("SELECT * FROM questions WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Questions: ", res);
    result(null, res);
  });
};*/

Question.updateById = (id, Question, result) => {
  sql.query(
    "UPDATE questions SET question_text = ? WHERE id = ?",
    [Question.question_text, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Question with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Question: ", { id: id, ...Question });
      result(null, { id: id, ...Question });
    }
  );
};

Question.remove = (id, result) => {
  sql.query("DELETE FROM questions WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Question with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Question with id: ", id);
    result(null, res);
  });
};

Question.removeAll = result => {
  sql.query("DELETE FROM questions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Questions`);
    result(null, res);
  });
};

module.exports = Question;
