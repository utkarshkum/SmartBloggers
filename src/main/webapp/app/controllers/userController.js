(function() {
	function UserControllerFunc($scope, $http, $log, $rootScope, $cookieStore, $location) {

		$scope.showloginForm = false;
		$rootScope.$broadcast('load');

		$scope.users = [];
		
		if ($cookieStore.get("login_info") == null && $location.path() != '/register') {
			$location.path("/login");
			return;
		}

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

		$scope.addUser = function(user) {
			$http.defaults.headers.common['Authorization'] = $rootScope.authHeader;

			$http.post("/SmartBloggers/rest/users", user).success(
					function(data) {
						$scope.users.push(user);
					});
		};
		
		$scope.registerUser = function(user) {

			var promise = $http.post("/SmartBloggers/rest/register", user)
			promise.success(function(data, status, headers, config) {
				$scope.register_success = "user registered sucessfully.";
				$scope.showRegisterSuccess = true;
				$log.info("user registered sucessfully.");
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
	}
	blogPostingApp.controller("UserController", UserControllerFunc);
})();