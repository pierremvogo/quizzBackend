const sql = require("../../mysql/db.js");

const Admin = (admin) => {
  this.code = admin.code;
};
Admin.findByCode = (code, result) => {
  sql.query(`SELECT * FROM admin WHERE code = ${code}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found Admin By code: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

module.exports = Admin;
