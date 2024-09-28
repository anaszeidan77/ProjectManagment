import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { register } from '../../model/auth';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode: boolean = true; // true for login form, false for registration form

  // Form groups for login and registration forms
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder // Inject FormBuilder
  ) {
    // Initialize the forms
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Method to switch to login form
  showLoginForm() {
    this.isLoginMode = true;
  }

  // Method to switch to registration form
  showRegisterForm() {
    this.isLoginMode = false;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      // Handle invalid form
      alert('Please fill in all required fields correctly.');
      return;
    }
  
    const loginInfo = this.loginForm.value;
    
    this.authService.login(loginInfo).subscribe({
      next: (res) => {
        if (res) {
          localStorage.setItem("token",res.token)
          localStorage.setItem("userName",res.username)
          localStorage.setItem("userId",res.userId);
          localStorage.setItem("email",res.email);
          localStorage.setItem("roles",res.roles.toString());
          alert('Logged saccsed');
          this.router.navigate(['/dashboard']); // Adjust the route as needed
        } else {
          alert('Invalid credentials');
        }
      },
      error: (error) => {
        console.error('Error occurred:', error);
        alert('An error occurred during login. Please try again later.');
      }
    });
  }
  
  onRegister() {
    if (this.registerForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }
  
    const registerInfo: register = this.registerForm.value;  
    this.authService.register(registerInfo).subscribe({
      next: (res : any) => {
        localStorage.setItem("token",res.token)
        alert('Registered ' + res.email);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error occurred:', error);
        alert('An error occurred during registration. Please try again later.');
      }
    });
  }
}

