// form-check.component.ts
import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-check',
  imports: [ReactiveFormsModule, JsonPipe, CommonModule],
  standalone: true,
  templateUrl: './form-check.component.html',
  styleUrl: './form-check.component.css',
})

export class FormCheckComponent {
  form: FormGroup;          // Main form group instance
  submitted = false;        // Tracks form submission status

  constructor(private fb: FormBuilder) {
    // Initializes the form structure with group name and empty users array
    this.form = this.fb.group({
      groupName: ['', Validators.required],
      users: this.fb.array([]),
    });
  }

  // Getter Methods
  get users() {
    // Provides typed access to the users FormArray
    return this.form.get('users') as FormArray;
  }

  getUserAddresses(userIndex: number): FormArray {
    // Retrieves the addresses FormArray for a specific user
    return this.users.at(userIndex).get('addresses') as FormArray;
  }

  // Add Methods
  addUser() {
    // Creates and adds a new user form group to the users array
    this.users.push(
      this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        age: [null, [Validators.required, Validators.min(18)]],
        addresses: this.fb.array([]),
      })
    );
  }

  addAddress(userIndex: number) {
    // Adds a new address form group to a specific user's addresses array
    const addresses = this.getUserAddresses(userIndex);
    addresses.push(
      this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
      })
    );
  }

  // Remove Methods
  removeUser(index: number) {
    // Removes a user form group from the users array
    this.users.removeAt(index);
  }

  removeAddress(userIndex: number, addressIndex: number) {
    // Removes an address form group from a specific user's addresses array
    const addresses = this.getUserAddresses(userIndex);
    addresses.removeAt(addressIndex);
  }

  // Form Submission and Validation
  onSubmit() {
    // Handles form submission, validates and marks form as submitted if valid
    if (this.form.valid) {
      this.submitted = true;
      console.log(this.form.value);
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    // Recursively marks all controls in a form group/array as touched to trigger validation display
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}