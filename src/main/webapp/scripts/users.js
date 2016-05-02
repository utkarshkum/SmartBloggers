(function() {
	
	var myapp = angular.module("myapp", ['ngRoute']);
	
	myapp.config([ '$routeProvider', function($routeProvider) {
		$routeProvider.when('/users', {
			templateUrl : 'users.html',
			controller : 'UserController'
		}).when('/blogs', {
			templateUrl : 'blogs.html',
			controller : 'BlogController'
		}).when('/login', {
			templateUrl : 'login.html',
			controller : 'LoginController'
		}).otherwise({

		})
	} ]);
	
	myapp.factory('Base64', function() {
	    var keyStr = 'ABCDEFGHIJKLMNOP' +
	            'QRSTUVWXYZabcdef' +
	            'ghijklmnopqrstuv' +
	            'wxyz0123456789+/' +
	            '=';
	    return {
	        encode: function (input) {
	            var output = "";
	            var chr1, chr2, chr3 = "";
	            var enc1, enc2, enc3, enc4 = "";
	            var i = 0;

	            do {
	                chr1 = input.charCodeAt(i++);
	                chr2 = input.charCodeAt(i++);
	                chr3 = input.charCodeAt(i++);

	                enc1 = chr1 >> 2;
	                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	                enc4 = chr3 & 63;

	                if (isNaN(chr2)) {
	                    enc3 = enc4 = 64;
	                } else if (isNaN(chr3)) {
	                    enc4 = 64;
	                }

	                output = output +
	                        keyStr.charAt(enc1) +
	                        keyStr.charAt(enc2) +
	                        keyStr.charAt(enc3) +
	                        keyStr.charAt(enc4);
	                chr1 = chr2 = chr3 = "";
	                enc1 = enc2 = enc3 = enc4 = "";
	            } while (i < input.length);

	            return output;
	        },

	        decode: function (input) {
	            var output = "";
	            var chr1, chr2, chr3 = "";
	            var enc1, enc2, enc3, enc4 = "";
	            var i = 0;

	            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	            var base64test = /[^A-Za-z0-9\+\/\=]/g;
	            if (base64test.exec(input)) {
	                alert("There were invalid base64 characters in the input text.\n" +
	                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
	                        "Expect errors in decoding.");
	            }
	            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	            do {
	                enc1 = keyStr.indexOf(input.charAt(i++));
	                enc2 = keyStr.indexOf(input.charAt(i++));
	                enc3 = keyStr.indexOf(input.charAt(i++));
	                enc4 = keyStr.indexOf(input.charAt(i++));

	                chr1 = (enc1 << 2) | (enc2 >> 4);
	                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	                chr3 = ((enc3 & 3) << 6) | enc4;

	                output = output + String.fromCharCode(chr1);

	                if (enc3 != 64) {
	                    output = output + String.fromCharCode(chr2);
	                }
	                if (enc4 != 64) {
	                    output = output + String.fromCharCode(chr3);
	                }

	                chr1 = chr2 = chr3 = "";
	                enc1 = enc2 = enc3 = enc4 = "";

	            } while (i < input.length);

	            return output;
	        }
	    };
	});
	

	myapp.controller("UserController", function($scope, $http, $log) {

		$scope.showloginForm = false;
		
		$scope.users = [];
		
		$http.defaults.headers.common['Authorization'] = $scope.authHeader;

		var promise = $http.get('/SmartBloggers/rest/users');
		promise.success(function(data, status, headers, config) {
			$scope.users = data;
			$scope.loading = false;
		}).error(function(data, status, headers, config) {
			$scope.loading = false;
			$scope.error = status;
		});

		$scope.addUser = function(user) {
			$http.post("/SmartBloggers/rest/users", user).sucess(function(data) {
				$scope.users.push(user);
			});
		};

		$scope.editUser = function(user) {
			console.log(user);
			$scope.user = user;
			$scope.showEditForm = true;
			$scope.showAddForm = false;
		};

		$scope.updateUser = function(user) {
			$log.debug(user);
			$http.put('/SmartBloggers/rest/users', user).success(
					function(data, status, headers, config) {
						console.log(data);
						$scope.showEditForm = false;
					}).error(function(data, status, headers, config) {
				$scope.error = status;
				$scope.showEditForm = false;
			});
		};

	});
	
	myapp.controller("LoginController", function($scope, $http, $log, $rootScope, Base64) {
		
		$scope.loginUser = function(user) {
			
			var authHeaderValue = 'Basic ' + Base64.encode($scope.user.userName + ':' +  $scope.user.password);
					
			$http.defaults.headers.common['Authorization'] = authHeaderValue;
					
			var promise = $http.get('/SmartBloggers/rest/login');
			
			promise.success(function(data, status, headers, config) {
				$scope.authHeader = authHeaderValue;
				$scope.showloginForm = false;
				alert(status);
			}).error(function(data, status, headers, config) {
				$scope.loading = false;
				$scope.error = status;
			});
		};
		
	});

	myapp.controller("BlogController", function($scope, $http, $log) {
		$scope.blogs = [];
		$scope.blog = {};

		var promise = $http.get('/SmartBloggers/rest/blogs');
		promise.success(function(data, status, headers, config) {
			$scope.blogs = data;
			$scope.loading = false;
			$scope.showblogs = true;
		}).error(function(data, status, headers, config) {
			$scope.loading2 = false;
		});
		
		$scope.addBlog = function(blog) {
			
			$http.post("/SmartBloggers/rest/blogs", blog).success(function(data) {
				$scope.blogs.push(blog);
				$scope.blog = {};
			});
		};
	});
	
	myapp.controller("HomeController", function($scope, $http, $log) {

	});
})();