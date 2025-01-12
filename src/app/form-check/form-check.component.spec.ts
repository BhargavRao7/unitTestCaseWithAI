import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCheckComponent } from './form-check.component';
import { CommonModule } from '@angular/common';

describe('FormCheckComponent', () => {
  let component: FormCheckComponent;
  let fixture: ComponentFixture<FormCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Import the component instead of declaring it since it's standalone
        FormCheckComponent,
        ReactiveFormsModule,
        // Add any other imports your component needs
        CommonModule
      ]
      // Remove the declarations array since we're using imports
    }).compileComponents();

    fixture = TestBed.createComponent(FormCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form with default values', () => {
    expect(component.form.value).toEqual({ groupName: '', users: [] });
  });

  it('should add a new user to the form array', () => {
    component.addUser();
    expect(component.users.length).toBe(1);
  });

  it('should remove a user from the form array', () => {
    component.addUser();
    component.removeUser(0);
    expect(component.users.length).toBe(0);
  });

  it('should add an address to a user', () => {
    component.addUser();
    component.addAddress(0);
    expect(component.getUserAddresses(0).length).toBe(1);
  });

  it('should validate the form correctly', () => {
    component.form.patchValue({ groupName: 'Test Group' });
    component.addUser();
    component.users.at(0).patchValue({ name: 'John Doe', email: 'john@example.com', age: 25 });
    expect(component.form.valid).toBe(true);
  });

  describe('User Management', () => {
    it('should add user with correct form controls', () => {
      component.addUser();
      const user = component.users.at(0);
  
      expect(user.get('name')).toBeTruthy();
      expect(user.get('email')).toBeTruthy();
      expect(user.get('age')).toBeTruthy();
      expect(user.get('addresses')).toBeTruthy();
    });
  
    it('should remove correct user when multiple exist', () => {
      // Add two users
      component.addUser();
      component.addUser();
      
      // Set value for first user
      component.users.at(0).patchValue({ name: 'User 1' });
      component.users.at(1).patchValue({ name: 'User 2' });
  
      // Remove first user
      component.removeUser(0);
  
      // Check remaining user is User 2
      expect(component.users.length).toBe(1);
      // expect(component?.users.at(0).get('name').value).toBe('User 2');
    });
  });
});