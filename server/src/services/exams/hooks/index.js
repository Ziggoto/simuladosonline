'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const trim = require('./trim');

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [trim()],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
