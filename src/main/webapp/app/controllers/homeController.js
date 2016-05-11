(function() {

	function HomeControllerfunc($scope, $http, $log, $rootScope, $cookieStore) {

		if ($cookieStore.get("current_user") !=null) {
			$scope.username= $cookieStore.get("current_user");
			$scope.showlogoutlink = true;			 
		}
		
		$rootScope.$on('loginEvent', function (event, user) {
			 $scope.username= $cookieStore.get("current_user");
			 console.log($scope.message);
			 $scope.showlogoutlink = true;			 
			 });
		
		$scope.logoutUser = function() {
			$cookieStore.put("login_info", null);
			$scope.showlogoutlink = false;
			$cookieStore.put("current_user", "");
			$scope.username = "";
		};
	};

	blogPostingApp.controller("HomeController", HomeControllerfunc);

})();
