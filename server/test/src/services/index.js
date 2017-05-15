'use strict';
const students = require('./students');
const questions = require('./questions');
const exams = require('./exams');
const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(exams);
  app.configure(questions);
  app.configure(students);
};
