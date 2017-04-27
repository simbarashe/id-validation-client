(function(app) {
    'use strict';

    app.controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$location', '$filter', 'apiService', 'notificationService'];

    function MainCtrl($scope, $location, $filter, apiService, notificationService) {
        $scope.identification = {};
        $scope.identifications = [];
        $scope.validate = validate;

        function validate() {
            apiService.get('http://localhost:3366/api/identification/validate/' + $scope.identification.identifier, null,
                succeded,
                failed);
        }

        function succeded(response) {
            var results = $filter('filter')($scope.identifications, response.data, true);
            if (results.length === 0) {
                $scope.identifications.push(response.data);
            }
            $scope.IDValidation.reset();
        }

        function failed(response) {
            notificationService.displayError(response.data.message);
        }
    }

})(angular.module('validationApp'));