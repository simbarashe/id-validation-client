(function(app) {
    'use strict';

    app.controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$filter', 'apiService', 'notificationService'];

    function MainCtrl($scope, $filter, apiService, notificationService) {
        $scope.identification = {};
        $scope.identifications = [];
        $scope.validate = validate;
        $scope.succeded = succeded;
        $scope.failed = failed;

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

            $scope.identification = {};
            $scope.validationForm.reset();
        }

        function failed(response) {
            notificationService.displayError(response.data.message);
        }
    }

})(angular.module('validationApp'));