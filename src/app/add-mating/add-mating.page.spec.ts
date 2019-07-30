import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatingPage } from './add-mating.page';

describe('AddMatingPage', () => {
  let component: AddMatingPage;
  let fixture: ComponentFixture<AddMatingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMatingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
