var blogPostingApp = angular.module("blogPostingApp",
		[ "ngRoute", "ngCookies" ]);

blogPostingApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/users', {
		templateUrl : '/SmartBloggers/app/partials/users.html',
		controller : 'UserController'
	}).when('/register', {
		templateUrl : '/SmartBloggers/app/partials/register.html',
		controller : 'UserController'
	}).when('/blogs', {
		templateUrl : '/SmartBloggers/app/partials/blogs.html',
		controller : 'BlogController'
	}).when('/login', {
		templateUrl : '/SmartBloggers/app/partials/login.html',
		controller : 'LoginController'
	}).when('/', {
		redirectTo : "/login"
	}).when('/pagenotFound', {
		templateUrl : '/SmartBloggers/app/partials/Page404.html',
		controller : 'Page404Controller'
	}).otherwise({
		redirectTo : "/blogs"
	})
} ]);

