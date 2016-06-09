(function() {

	function HomeControllerfunc($scope, $http, $log, $rootScope, $cookieStore) {

		$scope.showloading = false;
		
		if ($cookieStore.get("current_user") !=null) {
			$scope.username= $cookieStore.get("current_user");
			$scope.showlogoutlink = true;			 
		}
		
		$rootScope.$on('load',function(event) {
			$scope.showloading = true;
		});
		
		$rootScope.$on('unload',function(event) {
			$scope.showloading = false;
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
		};
	};

	blogPostingApp.controller("HomeController", HomeControllerfunc);

})();
