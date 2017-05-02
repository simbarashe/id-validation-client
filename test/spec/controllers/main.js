'use strict';

///*
describe('Controller: MainCtrl', function() {

    var $controller,
        $scope,
        apiService,
        deferred,
        spyPromise,
        notificationService;

    beforeEach(angular.mock.module('validationApp'));
    beforeEach(angular.mock.module('common.core'));

    beforeEach(function() {
        apiService = jasmine.createSpyObj('apiService', [
            'get'
        ]);

        module(function($provide) {
            $provide.value('apiService', apiService);
        });
    });

    beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _notificationService_) {
        deferred = _$q_.defer();
        notificationService = _notificationService_;
        spyPromise = deferred.promise;
        apiService.get.and.returnValue(spyPromise);
        $scope = _$rootScope_.$new();
        $scope.identification = {};
        $scope.identifications = [];
        $scope.validationForm = {
            reset: function() {}
        };
        $controller = _$controller_('MainCtrl', {
            $scope: $scope
        });
    }));

    it('should exist', function() {
        expect($controller).toBeDefined();
    });

    it('should have an identification object', function() {
        expect($scope.identification).toBeDefined();
    });

    it('should have a list of identifications', function() {
        expect($scope.identifications).toBeDefined();
    });

    describe('.validate()', function() {

        it('should exist', function() {
            expect($scope.validate).toBeDefined();
        });

        it('should add an unique identification to the validated list', function() {
            var validResponse = {
                Identifier: '8502076289187',
                DateOfBirth: '07 Feb 1985',
                Gender: 'Male',
                Citizenship: 'Permanent Resident'
            };

            $scope.identification.identifier = '8502076289187';
            deferred.resolve({ data: validResponse });

            $scope.validate();
            var success = apiService.get.calls.mostRecent().args[2];
            success(apiService.get.calls.mostRecent().returnValue.$$state.value);
            expect(apiService.get).toHaveBeenCalledWith('http://localhost:3366/api/identification/validate/8502076289187', null, $scope.succeded, $scope.failed);
            expect($scope.identifications.length).toEqual(1);
        });

        it(' should display a validation message for an invalid ID', function() {
            $scope.identification.identifier = '850207628918';
            var response = { data: { message: 'The supplied id (850207628918) is invalid ' } };
            spyOn(notificationService, 'displayError');
            deferred.reject(response);
            $scope.validate();
            var failure = apiService.get.calls.mostRecent().args[3];
            failure(apiService.get.calls.mostRecent().returnValue.$$state.value);
            expect(apiService.get).toHaveBeenCalledWith('http://localhost:3366/api/identification/validate/850207628918', null, $scope.succeded, $scope.failed);
            expect($scope.identifications.length).toEqual(0);
            expect(notificationService.displayError).toHaveBeenCalledWith(response.data.message);
        });

    });
});