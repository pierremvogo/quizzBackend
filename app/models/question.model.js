const sql = require("../../mysql/db.js");

// constructor
const Question = function(Question) {
  this.title = Question.title;
  this.description = Question.description;
  this.published = Question.published;
};

Question.create = (newQuestion, result) => {
  sql.query("INSERT INTO Questions SET ?", newQuestion, (err, res) => {
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
  sql.query(`SELECT * FROM Questions WHERE id = ${id}`, (err, res) => {
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
  let query = "SELECT * FROM Questions";

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

Question.getAllPublished = result => {
  sql.query("SELECT * FROM Questions WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Questions: ", res);
    result(null, res);
  });
};

Question.updateById = (id, Question, result) => {
  sql.query(
    "UPDATE Questions SET title = ?, description = ?, published = ? WHERE id = ?",
    [Question.title, Question.description, Question.published, id],
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
  sql.query("DELETE FROM Questions WHERE id = ?", id, (err, res) => {
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
  sql.query("DELETE FROM Questions", (err, res) => {
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
