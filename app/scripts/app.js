'use strict';

var app = angular.module('no1scaffApp', [
    'ngRoute',
    'ngResource',
    'no1scaff.controllers',
    'no1scaff.directives'
    ]);

app.
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl:'views/login.html',
        // controller: 'usersCtrl'
      }).when('/home', {
        templateUrl:'views/home.html',
        controller: 'homeCtrl'
      }).
      otherwise({redirectTo:'/login'});
}]);