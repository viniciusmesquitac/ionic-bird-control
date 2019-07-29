import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMatingPage } from './info-mating.page';

describe('InfoMatingPage', () => {
  let component: InfoMatingPage;
  let fixture: ComponentFixture<InfoMatingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoMatingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
