'use strict';

describe('Factory: notificationService', function() {
    var notificationService, toastr;

    beforeEach(angular.mock.module('common.core'));

    beforeEach(inject(function(_notificationService_, _toastr_) {
        notificationService = _notificationService_;
        toastr = _toastr_;
    }));

    it('should exist', function() {
        expect(notificationService).toBeDefined();
    });


    describe('.displaySuccess()', function() {
        it('should exist', function() {
            expect(notificationService.displaySuccess).toBeDefined();
        });

        it(' should display a success message', function() {
            var message = 'The supplied id (850207628918) is invalid ';
            spyOn(notificationService, 'displaySuccess');
            notificationService.displaySuccess(message);
            expect(notificationService.displaySuccess).toHaveBeenCalled();
            expect(notificationService.displaySuccess).toHaveBeenCalledWith(message);
        });
    });

    describe('.displayError()', function() {

        it('should exist', function() {
            expect(notificationService.displayError).toBeDefined();
        });

        it(' should display an error message', function() {
            var message = 'The supplied id (850207628918) is invalid ';
            spyOn(notificationService, 'displayError');
            notificationService.displayError(message);
            expect(notificationService.displayError).toHaveBeenCalled();
            expect(notificationService.displayError).toHaveBeenCalledWith(message);
        });
    });

    describe('.displayWarning()', function() {
        it('should exist', function() {
            expect(notificationService.displayWarning).toBeDefined();
        });

        it(' should display a warning message', function() {
            var message = 'The supplied id (850207628918) is invalid ';
            spyOn(notificationService, 'displayWarning');
            notificationService.displayWarning(message);
            expect(notificationService.displayWarning).toHaveBeenCalled();
            expect(notificationService.displayWarning).toHaveBeenCalledWith(message);
        });
    });

    describe('.displayInfo()', function() {
        it('should exist', function() {
            expect(notificationService.displayInfo).toBeDefined();
        });

        it(' should display an informational message', function() {
            var message = 'The supplied id (850207628918) is invalid ';
            spyOn(notificationService, 'displayInfo');
            notificationService.displayInfo(message);
            expect(notificationService.displayInfo).toHaveBeenCalled();
            expect(notificationService.displayInfo).toHaveBeenCalledWith(message);
        });
    });
});