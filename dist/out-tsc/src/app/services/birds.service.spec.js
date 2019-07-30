import { TestBed } from '@angular/core/testing';
import { BirdsService } from './birds.service';
describe('BirdsService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(BirdsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=birds.service.spec.js.map