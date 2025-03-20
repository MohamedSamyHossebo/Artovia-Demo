import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { SaveUserDataService } from './services/auth/cookie/save-user-data.service';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule,ToastrModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'

})

export class AppComponent implements OnInit {
  isTokenAvailable: boolean = false;

  title = 'Artovia-dashboard';
  constructor(private saveUserDataService: SaveUserDataService) { }

  ngOnInit(): void {
    this.saveUserDataService.isLoggedIn.subscribe(status => {
      this.isTokenAvailable = status; 
    });
  }
}

