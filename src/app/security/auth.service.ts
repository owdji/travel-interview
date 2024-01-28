import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, from, delayWhen, switchMap, map } from "rxjs";
import { AuthResponse } from "./auth-response.model";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";
import { AuthRequest } from "./auth-request.model";
import { Storage } from "@ionic/storage-angular";

const API_URL = "https://comem-travel-log-api-2hr8.onrender.com/api/";

@Injectable({ providedIn: "root" })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;

  constructor(private http: HttpClient, private readonly storage: Storage) {
    this.#auth$ = new ReplaySubject(1);
    this.storage.get('auth').then((auth) => {
      this.#auth$.next(auth);
    });
  }

  isAuthenticated$(): Observable<boolean> {
    return this.#auth$.pipe(map((auth) => Boolean(auth)));
  }

  getUser$(): Observable<User | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.user));
  }

  getToken$(): Observable<string | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.token));
  }

  logIn$(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${API_URL}/auth`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      delayWhen((auth) => this.#saveAuth$(auth)),
      map(auth => {
        this.#auth$.next(auth);
        console.log(`User ${auth.user.name} logged in`);
        return auth.user;
      })
    );
  }

  logOut() {
    this.#auth$.next(undefined);
    this.storage.remove('auth');
    console.log('User logged out');
  }

  getUserById$(userId: string): Observable<User> {
    const userUrl = `${API_URL}/users/${userId}`;
    return this.http.get<User>(userUrl);
  }

  #saveAuth$(auth: AuthResponse): Observable<void> {
    return from(this.storage.set("auth", auth));
  }
}
