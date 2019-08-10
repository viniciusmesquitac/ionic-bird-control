import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatingFinalizeModalPagePage } from './mating-finalize-modal-page.page';

describe('MatingFinalizeModalPagePage', () => {
  let component: MatingFinalizeModalPagePage;
  let fixture: ComponentFixture<MatingFinalizeModalPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatingFinalizeModalPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatingFinalizeModalPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
