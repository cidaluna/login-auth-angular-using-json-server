import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChildrenComponent } from './home-children.component';

describe('HomeChildrenComponent', () => {
  let component: HomeChildrenComponent;
  let fixture: ComponentFixture<HomeChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeChildrenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
