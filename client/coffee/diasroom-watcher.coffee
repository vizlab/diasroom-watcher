app = angular.module 'app', ['ui.router']

app.controller 'MainController', require './controllers/main'

app.config ($stateProvider, $urlRouterProvider) ->
  $stateProvider.state 'main',
    controller: 'MainController'
    templateUrl: 'partials/main.html'
    url: '/'

  $urlRouterProvider.otherwise '/'

  return
