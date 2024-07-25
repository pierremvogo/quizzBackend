const Tutor = require("../models/tutor.model.js");


exports.findOneByCode = (req, res) => {
  Tutor.findByCode(req.params.code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutor with Code ${req.params.code}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutor with Code " + req.params.code
        });
      }
    } else res.send(data);
  });
};
