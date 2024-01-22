import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthRequest } from '../security/auth-request.model';
import { AuthService } from '../security/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  authRequest: Partial<AuthRequest> = {};
  loginError = false;

  constructor(private auth: AuthService, private router: Router) {
    this.authRequest = {};
  }

  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }
     // Hide any previous login error.
     this.loginError = false;

     // Perform the authentication request to the API.
     // NOTE: Since our form is valid, it means that "this.authRequest" is actually
     // a perfectly valid "AuthRequest" object, and that's what we are telling TypeScript
     // here with "as AuthRequest".
     this.auth.logIn$(this.authRequest as AuthRequest).subscribe({
       next: () => this.router.navigateByUrl("/"),
       error: (err) => {
         this.loginError = true;
         console.warn(`Authentication failed: ${err.message}`);
       },
     });
  }

  ngOnInit() {
  }

}
