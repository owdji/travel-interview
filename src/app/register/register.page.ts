// Import necessary modules and HttpClient
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {
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
      (data) => console.log(data),
      (error) => console.error('Erreur lors de la requête POST:', error)
    );
  }
}
