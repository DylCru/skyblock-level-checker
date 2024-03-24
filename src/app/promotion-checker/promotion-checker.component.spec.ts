import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionCheckerComponent } from './promotion-checker.component';

describe('PromotionCheckerComponent', () => {
  let component: PromotionCheckerComponent;
  let fixture: ComponentFixture<PromotionCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionCheckerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromotionCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
