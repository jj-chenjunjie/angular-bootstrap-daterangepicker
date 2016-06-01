(function() {
	var bdModule = angular.module('daterangepicker', []);

/*	bdModule.provider('Daterangepicker', function () {
		this.$get = function () {
			return {};
		}
	});*/
	
	bdModule.constant('daterangepickerOptions', {});
	
	bdModule.directive('daterangepicker', function(daterangepickerOptions){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: {
				options: '=daterangepicker',
			}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			// templateUrl: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				/*var options = angular.copy({}, daterangepickerOptions);
				angular.extend(options, $scope.options)*/
				console.log(daterangepickerOptions);
				angular.extend(daterangepickerOptions, $scope.options)
				iElm.daterangepicker(daterangepickerOptions);
				
			}
		};
	});
})();