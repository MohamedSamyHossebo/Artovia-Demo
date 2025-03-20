import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-grid-cards',
  standalone: true,
  imports: [NgOptimizedImage,TranslateModule],
  templateUrl: './grid-cards.component.html',
  styleUrl: './grid-cards.component.scss'
})
export class GridCardsComponent {

}
