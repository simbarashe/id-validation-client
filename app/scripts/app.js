(function() {
    'use strict';

    angular.module('validationApp', ['common.core', 'common.ui'])
        .config(config);
    // routeProvider code ommited;

    config.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider'];

    function config($httpProvider, $stateProvider, $urlRouterProvider) {
        /*        $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl',
                    })
                    .otherwise({
                        redirectTo: '/'
                    });*/

        $urlRouterProvider.otherwise('/home');
        // 
        // Now set up the states 
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
            });

        $httpProvider.defaults.useXDomain = true;
    }

})();