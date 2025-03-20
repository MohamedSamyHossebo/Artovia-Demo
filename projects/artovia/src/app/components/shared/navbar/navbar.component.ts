import { CommonModule } from '@angular/common';
import { GetAllSubsService } from '../../../services/subCategoryService/get-all-subs.service';
import { GetCategoriesService } from './../../../services/categoriesService/get-categories.service';
import { Component, ElementRef, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { DarkmodeSwitchService } from '../../../services/darkMode/darkmode-switch.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [GetCategoriesService, GetAllSubsService]
})
export class NavbarComponent implements OnInit {
  _allCategoriesService = inject(GetCategoriesService);
  _allSubCategoriesService = inject(GetAllSubsService);
  _darkModeService = inject(DarkmodeSwitchService);
  router = inject(Router);
  el = inject(ElementRef);
  renderer = inject(Renderer2);
  private translate = inject(TranslateService);

  categories: any[] = [];
  subCategories: any[] = [];
  categoryId: string = '';
  isDarkMode = false;
  currentLanguage = localStorage.getItem('lang') || 'en';

  @ViewChild('navbar') navbar!: ElementRef;



  ngOnInit(): void {
    this.getAllCategories();
    this.getAllSubCategories();
    this.translate.use(this.currentLanguage);
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const savedLang = localStorage.getItem('selectedLang') || 'en';
      this.translate.use(savedLang);
      this.currentLanguage = savedLang;
    });

    this._darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('selectedLang', lang);
    this.currentLanguage = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', lang === 'ar');
  }


  toggleDarkMode() {
    this._darkModeService.toggleDarkMode();
  }

  getAllSubCategories() {
    this._allSubCategoriesService.getAllSubCategory().subscribe({
      next: (data) => {
        this.subCategories = data.data;
      }
    })
  }
  getAllCategories() {
    this._allCategoriesService.getAllCategory().subscribe({
      next: (data) => {
        this.categories = data.data;
      }
    });
  }
  navigateToCategory(id: string) {
    this.router.navigate(['/specificCategory', id]).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    });
  }
  navigateToSubCategory(id: string) {
    this.router.navigate(['/specificSubCategory', id]).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    });
  }

}
