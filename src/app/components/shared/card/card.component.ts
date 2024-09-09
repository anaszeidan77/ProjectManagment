import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() id!: string;
  @Input() class!: string;
  @Input() btnClass: string = '';

  
  @Input() image?: string;
  @Input() imageAlt: string = ''; 
  @Input() imageBorderRadius: string = '0';

  @Input() title?: string;
  @Input() titleColor: string = '';
  @Input() titleAlign: string = '';

  @Input() text?: string;
  @Input() textColor: string = '';
  @Input() textAlign: string = '';

  @Input() icon?: string;
  @Input() iconClass: string = '';
  @Input() iconColor: string = '';
  @Input() iconSize: string = '';


  @Input() higth:string='';
  @Input() width: string = '';
  @Input() backgroundColor: string = '';
  @Input() border: string = '';
  @Input() borderRadius: string = '';
  @Input() boxShadow: string = '';
  @Input() padding: string = '';
  @Input() margin: string = '';
}

