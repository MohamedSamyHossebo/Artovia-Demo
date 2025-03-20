import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from '../shared/carousel/carousel.component';
import { CardsComponent } from '../shared/cards/cards.component';
import { BrowsCardsComponent } from '../shared/brows-cards/brows-cards.component';
import { GridCardsComponent } from "../shared/grid-cards/grid-cards.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CarouselComponent, CardsComponent, BrowsCardsComponent, GridCardsComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
