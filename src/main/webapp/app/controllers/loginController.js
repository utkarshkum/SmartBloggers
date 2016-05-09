(function() {
	function LoginControllerFunc($scope, $http, $log, $rootScope, Base64,
			$location, $cookieStore) {

		$cookieStore.put("current_user", "utkarsh");

		$scope.loginUser = function(user) {

			$scope.loading = true;
			$scope.showloginError=false;

			var authHeaderValue = 'Basic '
					+ Base64.encode($scope.user.userName + ':'
							+ $scope.user.password);

			$http.defaults.headers.common['Authorization'] = authHeaderValue;

			var promise = $http.get('/SmartBloggers/rest/blogs');

			promise.success(function(data, status, headers, config) {
				$cookieStore.put("login_info", authHeaderValue)
				$scope.loading = false;
				$scope.showloginForm = false;
				$cookieStore.put("current_user", $scope.user.userName);
				alert($cookieStore.get("current_user"));
				$scope.showlogout = true;
				$location.path('#/blogs');

			}).error(function(data, status, headers, config) {
				$scope.login_error = "login failure";
				$scope.showloginError=true;
				$scope.loading = false;
				$scope.error = status;
			});
		};
	}

	blogPostingApp.controller("LoginController", LoginControllerFunc);

})();