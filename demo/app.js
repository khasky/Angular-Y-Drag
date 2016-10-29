var app = angular.module('app', [
	'ngYDrag'
])
.controller('BaseController', ['$scope', '$timeout', function ($scope, $timeout) {
	var sample = [
		{ number: 1, title: 'Lorem ipsum dolor sit amet' },
		{ number: 2, title: 'An vim viris graecis appellantur' },
		{ number: 3, title: 'In dicant comprehensam eum' },
		{ number: 4, title: 'Eu graece minimum sea' },
		{ number: 5, title: 'Et mutat graeci docendi eos' }
	];
	
	$scope.items = {};
	$scope.items.primary = angular.copy(sample);
	$scope.items.before = angular.copy(sample);
	$scope.items.after = angular.copy(sample);
	
	// block drag and drop for first item
	$scope.onBefore = function (movingItem, swappingItem) {
		if ($scope.items.before.indexOf(movingItem) == 0 || $scope.items.before.indexOf(swappingItem) == 0)
			return false;
		
		return true;
	};
	
	// create fallback and restore after drag and drop
	var fallback;
	
	$scope.onStart = function (movingItem) {
		fallback = angular.copy($scope.items.after);
	};
	
	$scope.onAfter = function (movingItem, swappingItem) {
		$timeout(function () {
			$scope.items.after = angular.copy(fallback);
		});
	};
}]);