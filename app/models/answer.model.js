const sql = require("../../mysql/db.js");

// constructor
const Answer = function(Answer) {
  this.title = Answer.title;
  this.description = Answer.description;
  this.published = Answer.published;
};

Answer.create = (newAnswer, result) => {
  sql.query("INSERT INTO Answers SET ?", newAnswer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Answer: ", { id: res.insertId, ...newAnswer });
    result(null, { id: res.insertId, ...newAnswer });
  });
};

Answer.findById = (id, result) => {
  sql.query(`SELECT * FROM Answers WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Answer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Answer with the id
    result({ kind: "not_found" }, null);
  });
};

Answer.getAll = (title, result) => {
  let query = "SELECT * FROM Answers";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Answers: ", res);
    result(null, res);
  });
};

Answer.getAllPublished = result => {
  sql.query("SELECT * FROM Answers WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Answers: ", res);
    result(null, res);
  });
};

Answer.updateById = (id, Answer, result) => {
  sql.query(
    "UPDATE Answers SET title = ?, description = ?, published = ? WHERE id = ?",
    [Answer.title, Answer.description, Answer.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Answer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Answer: ", { id: id, ...Answer });
      result(null, { id: id, ...Answer });
    }
  );
};

Answer.remove = (id, result) => {
  sql.query("DELETE FROM Answers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Answer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Answer with id: ", id);
    result(null, res);
  });
};

Answer.removeAll = result => {
  sql.query("DELETE FROM Answers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Answers`);
    result(null, res);
  });
};

module.exports = Answer;
