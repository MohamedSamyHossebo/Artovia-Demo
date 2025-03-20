import { HttpClientModule } from '@angular/common/http';
import { SignUpService } from './../../services/auth/signUpService/sign-up.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private _AuthCreateAdminService = inject(SignUpService);
  private toastr = inject(ToastrService);

  errorFromCreateAdmin: string = '';

  // Custom Validator للتحقق من تطابق Password و Confirm Password
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  createForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required])
  }, { validators: this.passwordMatchValidator }); // إضافة الـ custom validator هنا

  createAdmin(creatForm: FormGroup) {
    if (creatForm.valid) {
      this._AuthCreateAdminService.signUp(creatForm.value).subscribe({
        next: (data: any) => {
          if (data == "success") {
            this.toastr.success('Created Admin successfully'); 
          } else {
            this.toastr.warning('Unexpected response, please check again');
          }
        },
        error: (error) => { 
          this.toastr.error('Error creating admin, This Email is used'); 
        }
      });
    } else {
      this.toastr.error('Form is invalid, please fill all required fields');
    }
  }
  
}