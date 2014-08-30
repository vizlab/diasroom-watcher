(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  module.exports = function($scope) {
    var chart, data, i, n, selection, socket;
    n = 20;
    data = {
      key: 'Temperature',
      values: (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= n ? _i < n : _i > n; i = 0 <= n ? ++_i : --_i) {
          _results.push({
            x: i,
            y: 0
          });
        }
        return _results;
      })(),
      color: 'orange'
    };
    chart = nv.models.multiBarChart().showControls(false).showLegend(false).tooltips(false);
    selection = d3.select('#barchart');
    selection.attr({
      height: 500
    }).datum([data]).call(chart);
    $scope.temperature = 0;
    socket = io.connect('', {
      path: '/diasroom-watcher/socket.io',
      transports: ['websocket']
    });
    socket.on('emit_from_server', function(temperature) {
      var _i, _ref;
      $scope.temperature = +temperature;
      for (i = _i = 0, _ref = n - 1; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        data.values[i].y = data.values[i + 1].y;
      }
      data.values[n - 1].y = +temperature;
      selection.call(chart);
      $scope.$apply();
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