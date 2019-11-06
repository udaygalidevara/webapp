import {inject, TestBed} from '@angular/core/testing';

import {CloudGuard} from './cloud.guard';


describe('CloudGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CloudGuard]
        });
    });

    it('should ...', inject([CloudGuard], (guard: CloudGuard) => {
        expect(guard).toBeTruthy();
    }));
});
