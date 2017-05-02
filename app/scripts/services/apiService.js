(function(app) {
    'use strict';

    app.factory('apiService', apiService);

    apiService.$inject = ['$http'];

    function apiService($http) {
        var service = {
            get: get,
        };

        function get(url, config, success, failure) {
            return $http.get(url, config)
                .then(function(result) {
                    success(result);
                }, function(error) {
                    failure(error);
                });
        }

        return service;
    }

})(angular.module('common.core'));