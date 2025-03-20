import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UpdateProfileDataService } from '../services/profile/profileData/update-profile-data.service';
import { GetProfileDataService } from '../services/profile/profileData/get-profile-data.service';
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  _getProfileDataService = inject(GetProfileDataService);
  _updateProfileDataService = inject(UpdateProfileDataService);
  _build = inject(FormBuilder)
  profileData: any[] = [];
  profile!: FormGroup;
  editingProfile: string = '';

  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();
  private toastr = inject(ToastrService);


  ngOnInit(): void {
    this.profile = this._build.group({
      userName: ['', [Validators.required]],
    });
    this.getProfileData();
  }

  getProfileData() {
    this._getProfileDataService.getAllData().pipe(
      tap(() => console.log('Fetching products...')), // للتأكد أن الطلب بدأ
      finalize(() => {
        this.loadingSubject.next(false);
      }) //
    ).subscribe({
      next: (res: any) => {
        this.profileData = Array.isArray(res) ? res : [res];
      }
      , error: (error) => {
        this.toastr.error(error.error.message)

      }
    }
    )
  }
  editeProfile(data: any) {
    console.log(data.user.userName)
    this.editingProfile = data.user.userName;
    this.profile.patchValue({
      userName: data.userName,
    });
  }
  updateProfileData() {
    const formData = new FormData();
    formData.append('userName', this.profile.value.userName);
    console.log(this.profile.value.userName);
    this._updateProfileDataService.editeProfile(formData).subscribe({
      next: (res: any) => {
        this.toastr.success('Profile updated successfully')
        this.ngOnInit();
      },
      error: (error: any) => {
        this.toastr.error(error.error.message)
      }
    })
    this.ngOnInit();
  }

}
