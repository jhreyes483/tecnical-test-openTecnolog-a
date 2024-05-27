import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPaginateComponent } from './app-paginate.component';

describe('AppPaginateComponent', () => {
  let component: AppPaginateComponent;
  let fixture: ComponentFixture<AppPaginateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppPaginateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppPaginateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
