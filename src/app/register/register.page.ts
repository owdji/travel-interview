// Import necessary modules and HttpClient
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RegisterPage implements OnInit {
  data: any = {};
  name: String;
  password: String;

  constructor(private http: HttpClient, public toastController: ToastController, private router: Router) {
    this.name = '';
    this.password = '';
  }

  ngOnInit() {}

  postData(name: String, password: String) {
    const url = 'https://comem-travel-log-api-2hr8.onrender.com/api/users';
    const body = {
      name: name,
      password: password,
    };

    // create a console log to see if the data is correct
    console.log(body);

    // send the data to the API
    this.http.post(url, body).subscribe(
      (data) => {
        console.log(data);

        // Ajouter un message à l'utilisateur
        this.presentToast('Your account has been created. You can now log in.');

        // Rediriger l'utilisateur vers la page de login (assurez-vous d'avoir la bonne URL)
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.error('Error with the post request', error);

        // Ajouter un message d'erreur à l'utilisateur
        alert(
          'An error occurred when creating your account. Please check your internet connection and try again.'
        );
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
