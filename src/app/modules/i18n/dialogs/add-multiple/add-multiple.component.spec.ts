import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultipleComponent } from './add-multiple.component';

describe('AddMultipleComponent', () => {
  let component: AddMultipleComponent;
  let fixture: ComponentFixture<AddMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
