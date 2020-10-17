import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocmentComponent } from './add-docment.component';

describe('AddDocmentComponent', () => {
  let component: AddDocmentComponent;
  let fixture: ComponentFixture<AddDocmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
