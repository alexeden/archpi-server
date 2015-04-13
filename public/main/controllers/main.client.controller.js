
// Retrieve the main module
// Use the controller() method to create a new constructor function

// Create the 'main' controller
angular.module('main').controller(
	'MainController', 
	[
		'$scope', 'Authentication',

		function($scope, Authentication) {
			console.log("MainController controller initialization");
			// Inject the Authentication service to the controller
			// Use it to reference the model name field
			$scope.authentication = Authentication;
		}
	]
);
