import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProductsComponent } from './sub-products.component';

describe('SubProductsComponent', () => {
  let component: SubProductsComponent;
  let fixture: ComponentFixture<SubProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
