(function() {

	function BlogControllerFunc($scope, $http, $log, $rootScope, $cookieStore, $location) {
		$scope.blogs = [];
		$scope.blog = {};
		
		if ($cookieStore.get("login_info") == null) {
			$location.path("/login");
			return;
		}
	
		$http.defaults.headers.common['Authorization'] = $cookieStore
				.get("login_info");
		
		var promise = $http.get('/SmartBloggers/rest/blogs');
		promise.success(function(data, status, headers, config) {
			$scope.blogs = data;
			$scope.loading = false;
			$scope.showblogs = true;
		}).error(function(data, status, headers, config) {
			$scope.loading2 = false;
		});

		$scope.addBlog = function(blog) {
			
			$scope.showBlogAddSuccess = false;
			$scope.showBlogAddError = false;

			
			if ($cookieStore.get("login_info") == null) {
				$location.path("/login");
				return;
			}
			
			$http.defaults.headers.common['Authorization'] = $cookieStore
					.get("login_info");
			blog.userName = $cookieStore.get("current_user");
			$http.post("/SmartBloggers/rest/blogs", blog).success(
					function(data) {
						$scope.blogs.push(blog);
						$scope.blog = {};
						$scope.showaddblog = false;
						$scope.blog_add_success = "blog added sucessfully";
						$scope.showBlogAddSuccess = true;
					});
		};
	}

	blogPostingApp.controller("BlogController", BlogControllerFunc);

})();
