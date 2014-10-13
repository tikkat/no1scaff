'use strict';

var controllers = angular.module('no1scaff.controllers',
[]);

controllers.controller('homeCtrl', ['$scope', function($scope){
	$scope.fuck = "pusspuss!";		
}]);

controllers.controller('usersCtrl', ['$scope', '$window', '$resource', '$http', function ($scope, $window, $resource, $http) {
	var User = $resource('/api/users');

	User.query(function(results) {
		$scope.users = results;
	});

	//This will get the current online user.
	$http.get('/currentUser').success(function(data) {
    	$scope.currentUser = data;
	});

}]);
