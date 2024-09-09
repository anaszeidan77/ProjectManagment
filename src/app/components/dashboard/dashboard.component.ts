import { Component } from '@angular/core';
import { SidbarComponent } from "./sidbar/sidbar.component";
import { HeaderComponent } from "./header/header.component";
import { ContentComponent } from "./content/content.component";
import { FooterComponent } from "./footer/footer.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidbarComponent, HeaderComponent, ContentComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
