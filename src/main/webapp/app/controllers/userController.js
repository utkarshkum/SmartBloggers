(function() {
	function UserControllerFunc($scope, $http, $log, $rootScope, $cookieStore) {

		$scope.showloginForm = false;

		$scope.users = [];

		$http.defaults.headers.common['Authorization'] = $cookieStore
				.get("login_info");

		var promise = $http.get('/SmartBloggers/rest/users');
		promise.success(function(data, status, headers, config) {
			$scope.users = data;
			$scope.loading = false;
		}).error(function(data, status, headers, config) {
			$scope.loading = false;
			$scope.error = status;
		});

		$scope.addUser = function(user) {
			$http.defaults.headers.common['Authorization'] = $rootScope.authHeader;

			$http.post("/SmartBloggers/rest/users", user).success(
					function(data) {
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