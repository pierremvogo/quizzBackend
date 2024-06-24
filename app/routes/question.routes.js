module.exports = app => {
  const quizz = require("../controllers/quizz.controller.js");

  var router = require("express").Router();

  // Create a new quizz
  router.post("/", quizz.create);

  // Retrieve all quizz
  router.get("/", quizz.findAll);

  // Retrieve all published quizz
  router.get("/published", quizz.findAllPublished);

  // Retrieve a single quizz with id
  router.get("/:id", quizz.findOne);

  // Update a quizz with id
  router.put("/:id", quizz.update);

  // Delete a quizz with id
  router.delete("/:id", quizz.delete);

  // Delete all quizz
  router.delete("/", quizz.deleteAll);

  app.use('/api/quizz', router);
};
