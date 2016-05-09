(function() {

	function BlogControllerFunc($scope, $http, $log, $rootScope, $cookieStore) {
		$scope.blogs = [];
		$scope.blog = {};
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
			$http.defaults.headers.common['Authorization'] = $cookieStore
					.get("login_info");

			$http.post("/SmartBloggers/rest/blogs", blog).success(
					function(data) {
						$scope.blogs.push(blog);
						$scope.blog = {};
					});
		};
	}

	blogPostingApp.controller("BlogController", BlogControllerFunc);

})();
