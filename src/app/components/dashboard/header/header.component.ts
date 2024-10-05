import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
isLoggedIn: boolean = false; // استخدم هذا المتغير لتحديد حالة تسجيل الدخول{
constructor(private authService : AuthService,private router :Router){}

logout(){
  this.authService.logout()
  this.isLoggedIn =false
  this.router.navigate(['/login'])
}
  ngOnInit(): void {
    this.checkLoginStatus(); // تحقق من حالة تسجيل الدخول عند تحميل المكون
  }

  checkLoginStatus() {
    // هنا يمكنك استخدام الكود الخاص بك للتحقق من حالة تسجيل الدخول
    this.isLoggedIn = !!localStorage.getItem('token'); // مثال: تحقق من وجود توكن في التخزين المحلي
  }
}
