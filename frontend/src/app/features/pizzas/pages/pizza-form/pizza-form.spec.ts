import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaForm } from './pizza-form';

describe('PizzaForm', () => {
  let component: PizzaForm;
  let fixture: ComponentFixture<PizzaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PizzaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
