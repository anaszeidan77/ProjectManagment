import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjectDetailsComponent } from './project-details.component';

describe('PrjectDetailsComponent', () => {
  let component: PrjectDetailsComponent;
  let fixture: ComponentFixture<PrjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrjectDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
