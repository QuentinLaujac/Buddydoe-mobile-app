'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import buddyReducer from './../reducers'
var promise = require('./promise');
var array = require('./array');
var reducers = require('../reducers');
var createLogger = require('redux-logger');
var {AsyncStorage} = require('react-native');

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

function configureStore(onComplete: ?() => void) {
  const store = createStore(buddyReducer, applyMiddleware(thunk, promise, array, logger)) ;
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

module.exports = configureStore;
