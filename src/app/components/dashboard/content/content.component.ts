import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from "../../auth/auth.component";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterOutlet, AuthComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

}
