import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { register } from '../../model/auth';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    trigger('formAnimation', [
      transition('* => *', [
        // إعداد العناصر الداخلة والخارجة
        query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),

        // تحريك العناصر
        group([
          query(':leave', [
            animate('0.3s ease-in-out', style({ opacity: 0, transform: 'translateX(-100%)' }))
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0, transform: 'translateX(100%)' }),
            animate('0.3s ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AuthComponent {
  isLoginMode: boolean = true; // true for login form, false for registration form
  hidePassword = true;
  hideConfirmPassword = true;
  // Form groups for login and registration forms
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  showLoginForm() {
    this.isLoginMode = true;
  }

  showRegisterForm() {
    this.isLoginMode = false;
  }

  // دالة التحقق من تطابق كلمة المرور
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // دوال إظهار/إخفاء كلمة المرور
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      // Handle invalid form
      alert('Please fill in all required fields correctly.');
      return;
    }

    const loginInfo = this.loginForm.value;
    
    this.authService.login(loginInfo).subscribe({
      next: (res: any) => {
        if (res) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("userName", res.username);
          localStorage.setItem("userId", res.userId);
          localStorage.setItem("email", res.email);
          localStorage.setItem("roles", res.roles.toString());

          this.isLoggedIn$.next(true);
          this.router.navigate(['/dashboard/Statistics']);
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
      next: (res: any) => {
        localStorage.setItem("token", res.token);
        alert('Registered successfully');
        this.showLoginForm();
        this.loginForm.patchValue({
          email: registerInfo.email,
          password: registerInfo.password
        });
        this.onLogin();
      },
      error: (error) => {
        console.error('Error occurred:', error);
        alert('An error occurred during registration. Please try again later.');
      }
    });
  }
}
