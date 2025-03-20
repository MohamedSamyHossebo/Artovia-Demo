import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ResetPasswordService } from '../../services/profile/profileData/forgetPasswrod/reset-password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  step: number = 1;
  email: string = '';
  otp: string = '';
  responseMessage: string = '';
  newPassword: string = '';
  emailInput!: FormGroup;
  otpInputs!: FormGroup;

  _build = inject(FormBuilder)
  private toastr = inject(ToastrService);

  constructor(private resetPasswordService: ResetPasswordService) { }
  ngOnInit(): void {
    this.emailInput = this._build.group({
      email: ['', [Validators.required]],
    });
    this.otpInputs = this._build.group({
      code: ['', [Validators.required,,Validators.minLength(5),Validators.maxLength(6)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(5)]]
    });
  }


  resetPassword() {
    if (this.emailInput.invalid) {
      alert("Please enter a valid email!");
      return;
    }

    const requestData = { email: this.emailInput.value.email };
    console.log("Sending data:", requestData);

    this.resetPasswordService.resetPassword(requestData).subscribe({
      next: (res: any) => {
        this.toastr.info("OTP sent successfully!")
        this.nextStep();
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.toastr.error("Error sending OTP",error.error.message);
        }
    });
  }


  nextStep() {
    if (this.step < 3) {
      this.step++;
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  submitOTP() {

    const requestData = {
      email: this.otpInputs.value.email,
      code: this.otpInputs.value.code,
      password:this.otpInputs.value.password

    };
    console.log("Sending data:", requestData);

    this.resetPasswordService.resetOtp(requestData).subscribe({
      next: (res: any) => {
        console.log('OTP verified:', res);
        alert("Password has been reset successfully!");
        this.nextStep();
      },
      error: (error: any) => {
        console.error('Error:', error);
        alert(error?.error?.message || "Failed to verify OTP. Try again.");
      }
    });

  }



}
