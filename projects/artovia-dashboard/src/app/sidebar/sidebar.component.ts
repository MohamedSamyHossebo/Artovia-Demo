import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SaveUserDataService } from '../services/auth/cookie/save-user-data.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements AfterViewInit, OnInit {
  _saveUserService = inject(SaveUserDataService);
  isLogin$: Observable<boolean> = this._saveUserService.isLoggedIn; // متغير لحالة تسجيل الدخول

  @ViewChild('bl7') bl7!: ElementRef;

  ngOnInit(): void {
 
  }
  ngAfterViewInit() {
    const sideBar = this.bl7.nativeElement.querySelectorAll('a');

    sideBar.forEach((link: HTMLElement) => {
      link.addEventListener('click', () => {
        sideBar.forEach((otherLink: HTMLElement) => {
          otherLink.classList.remove('active');
        });
        link.classList.add('active');
      });
    });

  }
  logOut() {
    this._saveUserService.logOut();
  }

}
