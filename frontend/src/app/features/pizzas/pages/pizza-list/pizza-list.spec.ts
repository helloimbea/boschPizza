import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaList } from './pizza-list';

describe('PizzaList', () => {
  let component: PizzaList;
  let fixture: ComponentFixture<PizzaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaList],
    }).compileComponents();

    fixture = TestBed.createComponent(PizzaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
