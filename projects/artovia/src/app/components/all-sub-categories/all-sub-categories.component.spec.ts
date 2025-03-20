import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubCategoriesComponent } from './all-sub-categories.component';

describe('AllSubCategoriesComponent', () => {
  let component: AllSubCategoriesComponent;
  let fixture: ComponentFixture<AllSubCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSubCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllSubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
