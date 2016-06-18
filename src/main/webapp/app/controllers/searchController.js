(function() {
	
	function SearchControllerFunc($scope, $http, $log, $rootScope, $cookieStore, $location) {
		
		$scope.blogs = [];
		$scope.blog = {};
		$rootScope.searchblogsresults = false;
		$rootScope.show_on_result_found_msg = false;

		$scope.searchBlog = function(tags) {
			
			$rootScope.$broadcast('load');
						
			if ($cookieStore.get("login_info") == null) {
				$location.path("/login");
				return;
			}
			
			$http.defaults.headers.common['Authorization'] = $cookieStore
					.get("login_info");
			var url = '/SmartBloggers/rest/blogs/tags/'+tags;
			var promise = $http.get(url);
			promise.success(function(data, status, headers, config) {
				$scope.blogs = data;
				$rootScope.$broadcast('unload');
				$rootScope.searchblogsresults = true;
				if ($scope.blogs.length == 0) {
					$scope.no_result_found = true;
				} else {
					$scope.no_result_found = false;
				}
			}).error(function(data, status, headers, config) {
				$rootScope.$broadcast('unload');
			});
			

		};
	}

	blogPostingApp.controller("SearchController", SearchControllerFunc);

})();
