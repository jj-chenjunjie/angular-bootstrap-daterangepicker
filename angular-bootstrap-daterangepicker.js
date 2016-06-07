(function() {
	
	
	var bdModule = angular.module('daterangepicker', []);
	
	bdModule.provider("daterangepicker", function(){
		var defaultOptions = {
			ranges: {
				"今天": [
		            moment(),
		            moment()
		        ],
		        "昨天": [
		            moment().subtract(1, 'd'),
		            moment().subtract(1, 'd')
		        ],
		        "7日": [
		            moment().subtract(6, 'd'),
		            moment()
		        ],
		        "30日": [
		            moment().subtract(29, 'd'),
		            moment()
		        ],
		        "本月": [
		            moment().startOf('month'),
		            moment(),
		        ],
		        "上个月": [
		            moment().subtract(1, 'M').startOf('month'),
		            moment().subtract(1, 'M').endOf('month'),
		        ]
			},
			locale: {
				"applyLabel": "应用",
		        "cancelLabel": "取消",
		        "fromLabel": "From",
		        "toLabel": "To",
		        "customRangeLabel": "自定义",
		        "weekLabel": "W",
		        "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
		        "monthNames": ["1月", "2月", "3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
		        "firstDay": 1
			}
		};
		this.setOptions = function(options){
			angular.merge(defaultOptions, options);
		}
		
		this.$get = function(){
			return {
				getOptions: function(){
					return angular.copy(defaultOptions);
				}
			}
		}
	});
	
	bdModule.directive('daterangepicker', function(daterangepicker){
		return {
			scope: {
				options: '=daterangepicker',
				start: "=",
				end: "=",
				ngModel: '='
			},
			link: function($scope, iElm, iAttrs, controller) {
				var options = daterangepicker.getOptions();
				angular.extend(options, $scope.options);
				
				if(!options.singleDatePicker){
					$scope.start = $scope.start || options.startDate || moment().format(options.locale.format);
					$scope.end = $scope.end || options.endDate || moment().format(options.locale.format);
				}
				iElm.daterangepicker(options, function (start, end) {
					if(options.singleDatePicker){
						
					}else {
						$scope.start = start.format(options.locale.format);
						$scope.end = end.format(options.locale.format);		
						$scope.$apply();
					}
					
				});
				if(options.singleDatePicker){
					$scope.$watch("ngModel", function (newValue, oldValue) {
						iElm.data('daterangepicker').setStartDate(newValue)
					});
				}else {
					$scope.$watch("start", function (newValue, oldValue) {
						iElm.data('daterangepicker').setStartDate(newValue)
					});
					$scope.$watch("end", function (newValue, oldValue) {
						iElm.data('daterangepicker').setEndDate(newValue)
					});
				}
				
			}
		};
	});
})();