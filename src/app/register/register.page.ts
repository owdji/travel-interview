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
        this.presentToast('Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.');

        // Rediriger l'utilisateur vers la page de login (assurez-vous d'avoir la bonne URL)
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.error('Erreur lors de la requête POST:', error);

        // Ajouter un message d'erreur à l'utilisateur
        alert(
          'Erreur lors de la création du compte. Veuillez réessayer plus tard.'
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
