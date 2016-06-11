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

			var url = '/SmartBloggers/rest/users/' + user.userName;
			var promise = $http.get(url);

			promise.success(function(data, status, headers, config) {
				
				$cookieStore.put("login_info", authHeaderValue)
				$scope.showloginForm = false;
				$scope.user = data;
				$cookieStore.put("current_user", $scope.user.userName);
				$scope.showlogout = true;
				$rootScope.$broadcast('loginEvent');
				$rootScope.$broadcast('unload');
				$location.path('/showblogs');

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