'use strict';

module.exports = function(options) {
  return function(hook) {
    hook.data.questions = hook.data.questions.filter(question => question.description);
    return hook;
  };
};
