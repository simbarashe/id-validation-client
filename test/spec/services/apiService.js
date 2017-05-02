'use strict';

describe('Factory: apiService', function() {
    var apiService, $httpBackend;
    var actualIdentification, validation;

    beforeEach(angular.mock.module('common.core'));

    beforeEach(inject(function(_$httpBackend_, _apiService_) {
        $httpBackend = _$httpBackend_;
        apiService = _apiService_;
        actualIdentification = {};
        validation = {};
    }));

    it('should exist', function() {
        expect(apiService).toBeDefined();
    });

    function success(response) {
        actualIdentification = response.data;
    }

    function failure(response) {
        validation = response.data;
    }

    describe('.get()', function() {

        it('should exist', function() {
            expect(apiService.get).toBeDefined();
        });

        it('should return a valid identification', function() {
            var response = {
                Identifier: '8502076289187',
                DateOfBirth: '07 Feb 1985',
                Gender: 'Male',
                Citizenship: 'Permanet Resident'
            };
            var url = 'http://localhost:3366/api/identification/validate/8502076289187';
            $httpBackend.expectGET(url).respond(200, response);
            apiService.get(url, null, success, failure);
            $httpBackend.flush();
            expect(actualIdentification).toEqual(response);
            expect(validation).toEqual({});
        });

        it('should return a validation message', function() {
            var response = { message: 'The supplied id (850207628918) is invalid ' };
            var url = 'http://localhost:3366/api/identification/validate/850207628918';
            $httpBackend.expectGET(url).respond(400, response);
            apiService.get(url, null, success, failure);
            $httpBackend.flush();
            expect(validation).toEqual(response);
            expect(actualIdentification).toEqual({});
        });
    });
});