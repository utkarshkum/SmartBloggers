(function() {
	function LoginControllerFunc($scope, $http, $log, $rootScope, Base64,
			$location, $cookieStore) {

		$scope.loginUser = function(user) {
			
			$rootScope.$broadcast('load');

			$scope.showloginError=false;
			$scope.showlogoutmsg=false;

			var authHeaderValue = 'Basic '
					+ Base64.encode($scope.user.userName + ':'
							+ $scope.user.password);

			$http.defaults.headers.common['Authorization'] = authHeaderValue;

			var promise = $http.get('/SmartBloggers/rest/blogs');

			promise.success(function(data, status, headers, config) {
				
				$cookieStore.put("login_info", authHeaderValue)
				$scope.showloginForm = false;
				$cookieStore.put("current_user", $scope.user.userName);
				$scope.showlogout = true;
				$rootScope.$broadcast('loginEvent');
				$location.path('#/blogs');
				$rootScope.$broadcast('unload');

			}).error(function(data, status, headers, config) {
				$scope.login_error = "login failure";
				$scope.showloginError=true;
				$scope.error = status;
				$rootScope.$broadcast('unload');
			});
		};
	}

	blogPostingApp.controller("LoginController", LoginControllerFunc);

})();