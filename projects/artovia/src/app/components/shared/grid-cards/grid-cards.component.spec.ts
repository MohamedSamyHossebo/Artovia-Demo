import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCardsComponent } from './grid-cards.component';

describe('GridCardsComponent', () => {
  let component: GridCardsComponent;
  let fixture: ComponentFixture<GridCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
