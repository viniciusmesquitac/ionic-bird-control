import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBirdPage } from './info-bird.page';

describe('InfoBirdPage', () => {
  let component: InfoBirdPage;
  let fixture: ComponentFixture<InfoBirdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoBirdPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBirdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
