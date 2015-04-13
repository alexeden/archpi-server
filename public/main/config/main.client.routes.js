// $routeProvider object implementation

// Configure the 'main' module routes
angular.module('main').config(['$routeProvider',
	// Use dependency injection on $routeProvider object
	function($routeProvider) {
		// Define a new route using .when(), which has two arguments:
		// [1] Route's URL
		// [2] Options block, defines template URL
		$routeProvider
		.when('/', {
			templateUrl: 'main/views/main.client.view.html'
		})
		.otherwise({
			redirectTo: '/'
		});
	}
]); 
