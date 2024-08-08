CREATE TABLE QUIZ (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE STUDENTS (
  student_id INT PRIMARY KEY AUTO_INCREMENT,
  student_number INT UNIQUE NOT NULL,
  name VARCHAR(64) NOT NULL,
  surname VARCHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE STUDENTS_QUIZ(
  student_fkid INT NULL,
  quiz_fkid INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_fkid) REFERENCES STUDENTS (student_id),
  FOREIGN KEY (quiz_fkid) REFERENCES QUIZ (id) 
);

CREATE TABLE QUESTIONS (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question_text TEXT UNIQUE NOT NULL,
  question_type VARCHAR(64) NOT NULL,
  quiz_id INT NOT NULL,
  FOREIGN KEY (quiz_id) REFERENCES QUIZ (id)
);

CREATE TABLE ANSWERS (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question_id INT NOT NULL,
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  FOREIGN KEY (question_id) REFERENCES QUESTIONS (id)
);

CREATE TABLE STUDENTS_ANSWERS(
  student_fkid INT NULL,
  answer_fkid INT NULL,
  answer_text_fk TEXT NULL,
  correct VARCHAR(20) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_fkid) REFERENCES STUDENTS (student_id),
  FOREIGN KEY (answer_fkid) REFERENCES ANSWERS (id) 
);

CREATE TABLE ADMIN (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code INT NOT NULL
);

INSERT INTO ADMIN (code) VALUES (1024);
INSERT INTO ADMIN (code) VALUES (2048);

CREATE TABLE TUTOR (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code INT NOT NULL
);

INSERT INTO TUTOR (code) VALUES (2000);
INSERT INTO TUTOR (code) VALUES (3000);



