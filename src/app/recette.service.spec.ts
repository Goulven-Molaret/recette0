import { TestBed, inject } from '@angular/core/testing';

import { RecetteService } from './recette.service';

describe('RecetteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecetteService]
    });
  });

  it('should be created', inject([RecetteService], (service: RecetteService) => {
    expect(service).toBeTruthy();
  }));
});
