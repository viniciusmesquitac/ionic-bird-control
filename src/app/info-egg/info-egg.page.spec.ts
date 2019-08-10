import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEggPage } from './info-egg.page';

describe('InfoEggPage', () => {
  let component: InfoEggPage;
  let fixture: ComponentFixture<InfoEggPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEggPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEggPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
