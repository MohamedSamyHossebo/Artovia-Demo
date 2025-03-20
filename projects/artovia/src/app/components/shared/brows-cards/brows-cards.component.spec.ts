import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsCardsComponent } from './brows-cards.component';

describe('BrowsCardsComponent', () => {
  let component: BrowsCardsComponent;
  let fixture: ComponentFixture<BrowsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowsCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
