import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBirdPage } from './create-bird.page';

describe('CreateBirdPage', () => {
  let component: CreateBirdPage;
  let fixture: ComponentFixture<CreateBirdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBirdPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBirdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
