(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  module.exports = function($scope) {
    var chart, data, n, selection, socket;
    n = 50;
    data = {
      key: 'Temperature',
      values: [],
      color: 'orange'
    };
    chart = nv.models.multiBarChart().showControls(false).showLegend(false).tooltips(false).x(function(d) {
      return d.datetime;
    }).y(function(d) {
      return d.temperature;
    }).yDomain([0, 50]).rotateLabels(45).reduceXTicks(false).margin({
      right: 80,
      bottom: 80
    });
    chart.xAxis.tickFormat(d3.time.format('%Y/%m/%d %H:%M'));
    selection = d3.select('#barchart').attr({
      height: 500
    }).datum([data]).call(chart);
    $scope.temperature = 0;
    socket = io.connect('', {
      path: '/diasroom-watcher/socket.io',
      transports: ['websocket']
    });
    socket.on('update temperature', function(temperature) {
      $scope.temperature = +temperature.temperature;
      $scope.$apply();
    });
    socket.on('response minitely', function(temperatures) {
      temperatures.forEach(function(t) {
        t.datetime = new Date(+t.datetime);
      });
      data.values = temperatures;
      selection.call(chart);
    });
    socket.on('update minitely temperature', function() {
      return socket.emit('request minitely', {
        n: n
      });
    });
  };

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