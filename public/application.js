// This file controls the initialization of the Angular app
// Include this file in the index.ejs view!
var mainApplicationModuleName = 'archpi-server';

// Create the main application module
var mainApplicationModule = angular.module(
	mainApplicationModuleName, 
	['ngResource', 'ngRoute', 'users', 'main']
);
 
// Let crawlers know this is a single-page app using Hashbangs.
// Configure the hashbang URLs using the $locationProvider services 
mainApplicationModule.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

// Fix the Facebook OAuth bug
if(window.location.hash === '#_=_') window.location.hash = '#!';

// Boostrap the app when assets are loaded and ready
angular.element(document).ready(function() {
	// Initiate a new AngularJS app using the main module
	angular.bootstrap(document, [mainApplicationModuleName]);
	console.log('AngularJS bootstrapped!');
})