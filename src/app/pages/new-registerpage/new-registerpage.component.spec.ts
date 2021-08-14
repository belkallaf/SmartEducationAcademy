import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegisterpageComponent } from './new-registerpage.component';

describe('NewRegisterpageComponent', () => {
  let component: NewRegisterpageComponent;
  let fixture: ComponentFixture<NewRegisterpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRegisterpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRegisterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
