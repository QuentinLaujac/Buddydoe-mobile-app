'use strict';

const loginActions = require('./login');
const navigationActions = require('./navigation');
const stayActions = require('./stay');
const eventActions = require('./event');
const userActions = require('./user');

module.exports = {
    ...loginActions,
    ...navigationActions,
    ...stayActions,
    ...eventActions,
};
