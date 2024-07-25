const sql = require("../../mysql/db.js");

const Tutor = (tutor) => {
  this.code = admin.code;
};
Tutor.findByCode = (code, result) => {
  sql.query(`SELECT * FROM tutor WHERE code = ${code}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found Tutor By code: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

module.exports = Tutor;
