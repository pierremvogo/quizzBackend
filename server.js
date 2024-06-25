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
  res.json({ message: "Welcome to bezkoder application." });
});

const students = require("./app/controllers/student.controller");
app.post("/api/students/create", students.create);

//require("./app/routes/student.routes.js")(app);
require("./app/routes/quizz.routes.js")(app);
require("./app/routes/question.routes.js")(app);
require("./app/routes/answer.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
