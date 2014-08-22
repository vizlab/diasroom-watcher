(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  module.exports = function() {};

}).call(this);

},{}],2:[function(require,module,exports){
(function() {
  var app;

  app = angular.module('app', ['ui.router']);

  app.controller('MainController', require('./controllers/main'));

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
      controller: 'MainController',
      templateUrl: 'partials/main.html',
      url: '/'
    });
    $urlRouterProvider.otherwise('/');
  });

}).call(this);

},{"./controllers/main":1}]},{},[2]);