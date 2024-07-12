const sql = require("../../mysql/db.js");

// constructor
const Answer = (Answer) => {
  this.answer_text = Answer.answer_text;
  this.is_correct = Answer.is_correct;
  this.question_id = Answer.question_id;
  this.student_id = Answer.student_id;
};

Answer.create = (newAnswer, result) => {
  sql.query("INSERT INTO answers SET ?", newAnswer, (err, res) => {
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
  sql.query(`SELECT * FROM answers WHERE id = ${id}`, (err, res) => {
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

Answer.findByQuestionId = (question_id, result) => {
  sql.query(`SELECT * FROM answers WHERE question_id = ${question_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Answer: ", res[0]);
      result(null, res);
      return;
    }

    // not found Answer with the id
    result({ kind: "not_found" }, null);
  });
};

Answer.getAll = (title, result) => {
  let query = "SELECT * FROM answers";
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

Answer.getCountAnswer = result => {
  sql.query("SELECT COUNT(*) FROM answers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Count Answer: ", res);
    result(null, res);
  });
};

Answer.getAllByPagination = (name, result, offset) => {
  let query = `SELECT * FROM answers LIMIT ${offset}, 5`;

  if (name) {
    query += ` WHERE title LIKE '%${name}%'`;
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

/*Answer.getAllPublished = result => {
  sql.query("SELECT * FROM answers WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Answers: ", res);
    result(null, res);
  });
};*/

Answer.updateById = (id, Answer, result) => {
  sql.query(
    "UPDATE answers SET answer_text = ?, is_correct = ? WHERE id = ?",
    [Answer.answer_text, Answer.is_correct, id],
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
  sql.query("DELETE FROM answers WHERE id = ?", id, (err, res) => {
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
  sql.query("DELETE FROM answers", (err, res) => {
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
