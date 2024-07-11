const Admin = require("../models/admin.model.js");


exports.findOneByCode = (req, res) => {
  Admin.findByCode(req.params.code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Admin with Code ${req.params.code}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Admin with Code " + req.params.code
        });
      }
    } else res.send(data);
  });
};
