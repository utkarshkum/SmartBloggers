var blogPostingApp = angular.module("blogPostingApp",
		[ "ngRoute", "ngCookies" ]);

blogPostingApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/users', {
		templateUrl : '/SmartBloggers/app/partials/users.html',
		controller : 'UserController'
	}).when('/register', {
		templateUrl : '/SmartBloggers/app/partials/register.html',
		controller : 'UserController'
	}).when('/showblogs', {
		templateUrl : '/SmartBloggers/app/partials/blogs.html',
		controller : 'BlogController'
	}).when('/addblog', {
		templateUrl : '/SmartBloggers/app/partials/blog.html',
		controller : 'BlogController'
	}).when('/search', {
		templateUrl : '/SmartBloggers/app/partials/search.html',
		controller : 'SearchController'
	}).when('/login', {
		templateUrl : '/SmartBloggers/app/partials/login.html',
		controller : 'LoginController'
	}).when('/logout', {
		templateUrl : '/SmartBloggers/app/partials/logout.html',
		controller : 'LoginController'
	}).when('/mypage', {
		templateUrl : '/SmartBloggers/app/partials/mypage.html',
		controller : 'AccountController'
	}).when('/', {
		redirectTo : "/login"
	})
} ]);

