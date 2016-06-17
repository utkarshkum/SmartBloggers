(function() {

	function HomeControllerfunc($scope, $http, $log, $rootScope, $cookieStore, $location) {

		$rootScope.showloading = false;
		
		if ($cookieStore.get("current_user") !=null) {
			$scope.username= $cookieStore.get("current_user");
			$scope.showlogoutlink = true;			 
		}
		
		$rootScope.$on('load',function(event) {
			$rootScope.showloading = true;
		});
		
		$rootScope.$on('unload',function(event) {
			$rootScope.showloading = false;
		});
			
		$rootScope.$on('loginEvent', function (event) {
			 $scope.username= $cookieStore.get("current_user");
			 $scope.showlogoutlink = true;			 
			 });
		
		$scope.logoutUser = function() {
			$cookieStore.put("login_info", null);
			$scope.showlogoutlink = false;
			$cookieStore.put("current_user", null);
			$scope.username = "";
			$scope.showloading = false;
			$rootScope.$broadcast('unload');
		};
		$rootScope.showloading = false;
	};

	blogPostingApp.controller("HomeController", HomeControllerfunc);

})();
