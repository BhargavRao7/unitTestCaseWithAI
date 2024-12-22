import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCheckComponent } from './form-check.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormCheckComponent', () => {
  let component: FormCheckComponent;
  let fixture: ComponentFixture<FormCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCheckComponent],
      imports: [ReactiveFormsModule], // Ensure ReactiveFormsModule is imported
    }).compileComponents();

    fixture = TestBed.createComponent(FormCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('name')).toBeTruthy();
    expect(component.form.get('email')).toBeTruthy();
    expect(component.form.get('age')).toBeTruthy();
  });

  it('should submit valid form data', () => {
    component.form.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      age: 25,
    });

    component.onSubmit();

    expect(component.submitted).toBeTrue();
    expect(component.form.value).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      age: 25,
    });
  });
});
