import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidbar',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './sidbar.component.html',
  styleUrl: './sidbar.component.css'
})
export class SidbarComponent {

}
