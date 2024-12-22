import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormCheckComponent } from './form-check/form-check.component';

@Component({
  selector: 'app-root',
  imports: [ FormCheckComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ai-test-project';
}
