(function() {

	function HomeControllerfunc($scope, $http, $log, $rootScope, $cookieStore) {

		$scope.logoutUser = function($scope, $rootScope) {
			$cookieStore.put("login_info", null);

		};
	}
	;

	blogPostingApp.controller("HomeController", HomeControllerfunc);

})();
