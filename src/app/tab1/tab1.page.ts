import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonFab, IonFabButton, IonIcon, IonFabList, IonButton,  IonButtons} from '@ionic/angular/standalone';
import { AuthService } from '../security/auth.service';
import { logOut as logOutIcon } from "ionicons/icons";
import { Router } from "@angular/router";



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonFab,IonFabButton, IonIcon, IonFabList, IonButton, IonButtons]
})
export class Tab1Page {
  user$ = this.auth.getUser$();
  readonly logOutIcon = logOutIcon;

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router
  ) {}

  ngOnInit() {
  }

  // Add a method to log out.
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }
}
