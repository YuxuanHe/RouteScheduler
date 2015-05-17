var RouteOpt = angular.module('RouteOptimizer', []);
RouteOpt.service('EmployeesService', ['$http',function($http) {
		this.get = function() {
			return $http.get('/api/employees');
		};

		this.create = function(data) {
			return $http.post('/api/employees', data);
		};

		this.delete = function(id) {
			return $http.delete('/api/employees/' + id);
		};
	}])
	// inject the Todo service factory into our controller

RouteOpt.controller('employeeController', function($scope, $window, EmployeesService) {		
		
		$scope.create = function(employee) {
			EmployeesService.create({
				name: employee.name,
				address: employee.address,
				type: employee.type
			});
			alert("Employee successfully added. Redirecting to main page.");
			$window.location.assign("/");

		}

		$scope.test = function() {
			EmployeesService.get().
  			success(function(data, status, headers, config) {
			    console.log(data);
			  }).
			  error(function(data, status, headers, config) {
			    console.log("an error occurred fetching employees")
			  });
		}

		
		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
	})

	.controller('DisplayEmployeeController', function($scope, $window, EmployeesService) {

		$scope.view = function() {
			EmployeesService.get().
  			success(function(data, status, headers, config) {
  				return data;
			}).
			error(function(data, status, headers, config) {
			    console.log("an error occurred fetching employees")
			});
		}
		
		$scope.test = function() {
			EmployeesService.get().
  			success(function(data, status, headers, config) {
			    console.log(data);
			}).
			error(function(data, status, headers, config) {
			    console.log("an error occurred fetching employees")
			});
		}
		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos

	});

RouteOpt.controller('uploadController', function($scope) {		
		$scope.uploadFile = "";
		
		$scope.fileType = "sales";

		$scope.csvJSON = function(csv){ 
		  
			var reader = new FileReader();

			reader.onload = function(evt) {
				console.log("parse started");
			  
			  console.log("funished parsing");			  
			  
			}

			reader.readAsText($scope.uploadFile);

		}
			
	});

RouteOpt.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

/*var updateFileName = function(evt) {
		console.log("change registered");
		console.log("file name: ", document.getElementById("fileN").files[0].name);
};*/

