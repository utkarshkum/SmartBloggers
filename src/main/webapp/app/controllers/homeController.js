(function() {

	function HomeControllerfunc($scope, $http, $log, $rootScope, $cookieStore) {

		if ($cookieStore.get("current_user") !=null) {
			$scope.username= $cookieStore.get("current_user");
		}
		
		$rootScope.$on('loginEvent', function (event, user) {
			 $scope.username= $cookieStore.get("current_user");
			 console.log($scope.message);
			 $scope.showlogoutlink = true;			 
			 });
		
		$scope.logoutUser = function($scope, $rootScope) {
			$cookieStore.put("login_info", null);
			$scope.showlogoutlink = false;
			$cookieStore.put("current_user", null);
			$scope.username = null;
		};
	};

	blogPostingApp.controller("HomeController", HomeControllerfunc);

})();
