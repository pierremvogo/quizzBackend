const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const db = require("./mysql/db");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Carme Quizz application." });
});

const admin = require("./app/controllers/admin.controller");
app.get("/api/admin/getByCode/:code", admin.findOneByCode);

const tutor = require("./app/controllers/tutor.controller");
app.get("/api/tutor/getByCode/:code", tutor.findOneByCode);

const students = require("./app/controllers/student.controller");
app.post("/api/students/create", students.create);
app.get("/api/students/get", students.findAll);
app.get("/api/students/get/pagination/:offset", students.findAllByPagination);
app.get("/api/students/count", students.findCountStudent);
app.get("/api/students/getById/:id", students.findOne);
app.get("/api/students/getByQuizId/:id_quiz/:idstudent", students.findOneByQuizId);
app.get("/api/students/getByNumber/:student_number", students.findOneByNumber);
app.put("/api/students/update/:id", students.update);
app.put("/api/students/updateQuizId/:id", students.updateQuizId);
app.delete("/api/students/delete/:id", students.delete);
app.delete("/api/students/deleteAll", students.deleteAll);

const students_answers = require("./app/controllers/student_answer.controller");
app.post("/api/studentsAnswers/create", students_answers.create);
app.get("/api/studentsAnswers/get", students_answers.findAll);
app.get("/api/studentsAnswers/getById/:student_fkid/:answer_fkid", students_answers.findOne);
app.put("/api/studentsAnswers/update/:student_fkid/:answer_fkid", students_answers.update);
app.get("/api/studentsAnswers/getByAnswerId/:id/:idquiz", students_answers.findStudentByAnswerId);
app.get("/api/studentsAnswers/getByAnswerId1", students_answers.findStudentByAnswerId1);
app.get("/api/studentsAnswers/getQuestionByStudent/:id/:id_quiz", students_answers.findQuestionByStudentId);
app.delete("/api/studentsAnswers/delete/:student_fkid/:answer_fkid", students_answers.delete);

const students_quiz = require("./app/controllers/quiz_student.controller");
app.post("/api/studentsQuiz/create", students_quiz.create);
app.get("/api/studentsQuiz/get", students_quiz.findAll);
app.get("/api/studentsQuiz/getByStudentQuiz/:student_fkid/:quiz_fkid", students_quiz.findOne);
app.get("/api/studentsQuiz/getByStudentQuiz1/:student_fkid", students_quiz.findOne1);


const quizzs = require("./app/controllers/quizz.controller");
app.post("/api/quizzs/create", quizzs.create);
app.get("/api/quizzs/get", quizzs.findAll);
app.get("/api/quizzs/get/pagination/:offset", quizzs.findAllByPagination);
app.get("/api/quizzs/count", quizzs.findCountQuiz);
app.get("/api/quizzs/getById/:id", quizzs.findOne);
app.get("/api/quizzs/getHasQuestion", quizzs.findQuizzHasQuestions);
app.put("/api/quizzs/update/:id", quizzs.update);
app.delete("/api/quizzs/delete/:id", quizzs.delete);
app.delete("/api/quizzs/deleteAll", quizzs.deleteAll);


const questions = require("./app/controllers/question.controller");
app.post("/api/questions/create", questions.create);
app.get("/api/questions/get", questions.findAll);
app.get("/api/questions/get/pagination/:offset", questions.findAllByPagination);
app.get("/api/questions/count", questions.findCountQuestion);
app.get("/api/questions/getById/:id", questions.findOne);
app.get("/api/questions/getByQuizIdAndType/:quiz_id/:question_type", questions.findOneByQuizIdAndType);
app.get("/api/questions/getByQuizId/:quiz_id", questions.findOneByQuizId);
app.put("/api/questions/update/:id", questions.update);
app.delete("/api/questions/delete/:id", questions.delete);
app.delete("/api/questions/deleteAll", questions.deleteAll);


const answers = require("./app/controllers/answer.controller");
app.post("/api/answers/create", answers.create);
app.get("/api/answers/get", answers.findAll);
app.get("/api/answers/get/pagination/:offset", answers.findAllByPagination);
app.get("/api/answers/count", answers.findCountAnswer);
app.get("/api/answers/getById/:id", answers.findOne);
app.get("/api/answers/getByQuestionId/:question_id", answers.findOneByQuestionId);
app.put("/api/answers/update/:id", answers.update);
app.delete("/api/answers/delete/:id", answers.delete);
app.delete("/api/answers/deleteAll", answers.deleteAll);



//require("./app/routes/student.routes.js")(app);
//require("./app/routes/quizz.routes.js")(app);
//require("./app/routes/question.routes.js")(app);
//require("./app/routes/answer.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
