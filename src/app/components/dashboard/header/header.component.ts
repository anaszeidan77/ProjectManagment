import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
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
currentRoute: string = '';
today!: string;
month!: string;
year!: string;
userName: string=localStorage.getItem("userName") as string
role: string=localStorage.getItem("roles") as string
constructor(private authService : AuthService,
            private router: Router,          
            private activatedRoute: ActivatedRoute){
              const date = new Date();
              this.today = date.getUTCDay().toString(); 
              this.month = date.toLocaleString('default', { month: 'long' }); 
              this.year = date.getFullYear().toString();
            }

logout(){
  this.authService.logout()
  this.isLoggedIn =false
  
  this.router.navigate(['/login'])
}
  ngOnInit(): void {
    this.checkLoginStatus();
    this.getCurrentRoute()
    
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }
  getCurrentRoute(): void {
    this.router.events.subscribe(() => {
      let currentRoute = this.activatedRoute.root;
  
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }
  
      this.currentRoute = currentRoute.snapshot.url.map(segment => segment.path).join('/');
    });
  }
  
}
