module.exports = app => {
  const quizz = require("../controllers/quizz.controller.js");

  var router = require("express").Router();

  // Create a new quizz
  router.post("/create", quizz.create);

  // Retrieve all quizz
  router.get("/get", quizz.findAll);

  // Retrieve a single quizz with id
  router.get("/getById/:id", quizz.findOne);

  // Update a quizz with id
  router.put("/update:id", quizz.update);

  // Delete a quizz with id
  router.delete("/delete/:id", quizz.delete);

  // Delete all quizz
  router.delete("/delete", quizz.deleteAll);

  app.use('/api/quizz', router);
};
