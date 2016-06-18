(function() {
	function UserControllerFunc($scope, $http, $log, $rootScope, $cookieStore, $location) {

		$scope.showloginForm = false;
		$rootScope.$broadcast('load');

		
		$scope.users = [];
		
		if ($cookieStore.get("login_info") == null && $location.path() != '/register') {
			$location.path("/login");
			return;
		}
		
		if ($location.path() == '/users') {
			$http.defaults.headers.common['Authorization'] = $cookieStore
			.get("login_info");

			var promise = $http.get('/SmartBloggers/rest/users');
			promise.success(function(data, status, headers, config) {
				$scope.users = data;
				$rootScope.$broadcast('unload');
			}).error(function(data, status, headers, config) {
				$rootScope.$broadcast('unload');
				$scope.error = status;
			});
		}

		$scope.registerUser = function(user) {

			var promise = $http.post("/SmartBloggers/rest/users", user)
			promise.success(function(data, status, headers, config) {
				$scope.register_success = "User registered sucessfully.";
				$scope.showRegisterSuccess = true;
				$log.info("User registered sucessfully.");
			}).error(function(data, status, headers, config) {
				$scope.register_error="Failed to register";
				$scope.showRegisterError = true;
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
			$http.defaults.headers.common['Authorization'] = $cookieStore
					.get("login_info");

			$http.put('/SmartBloggers/rest/users', user).success(
					function(data, status, headers, config) {
						console.log(data);
						$scope.showEditForm = false;
					}).error(function(data, status, headers, config) {
				$scope.error = status;
				$scope.showEditForm = false;
			});
		};
		
		$rootScope.$broadcast('unload');
	}
	blogPostingApp.controller("UserController", UserControllerFunc);
})();