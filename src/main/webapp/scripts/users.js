(function() {
	
	var myapp = angular.module("myapp", ['ngRoute']);
	
	myapp.config([ '$routeProvider', function($routeProvider) {
		$routeProvider.when('/users', {
			templateUrl : 'users.html',
			controller : 'UserController'
		}).when('/products', {
			templateUrl : 'products.html',
			controller : 'ProductController'
		}).otherwise({

		})
	} ]);

	myapp.controller("UserController", function($scope, $http, $log) {
		$scope.users = [];

		var promise = $http.get('/SmartBloggers/rest/users');
		promise.success(function(data, status, headers, config) {
			$scope.users = data;
			$scope.loading = false;
		}).error(function(data, status, headers, config) {
			$scope.loading = false;
			$scope.error = status;
		});

		$scope.addUser = function(user) {
			$http.post("/SmartBloggers/rest/users", user).sucess(function(data) {
				$scope.users.push(user);
			});
		};

		$scope.editUser = function(user) {
			console.log(user);
			$scope.user = user;
			$scope.showEditForm = true;
			$scope.showAddForm = false;
		};

		$scope.updateUser = function(user) {
			$log.debug(user);
			$http.put('/SmartBloggers/rest/users', user).success(
					function(data, status, headers, config) {
						console.log(data);
						$scope.showEditForm = false;
					}).error(function(data, status, headers, config) {
				$scope.error = status;
				$scope.showEditForm = false;
			});
		};

	});

	myapp.controller("ProductController", function($scope, $http, $log) {
		$scope.products = [];

		var promise = $http.get('/SmartBloggers/products/product.json');
		promise.success(function(data, status, headers, config) {
			$scope.products = data;
			$log.warn("Hello" + data);
		}).error(function(data, status, headers, config) {
			$scope.loading2 = false;
		});
	});
})();