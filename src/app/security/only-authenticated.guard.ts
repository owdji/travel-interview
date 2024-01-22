import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { map } from "rxjs";

export const onlyAuthenticated: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService
    .isAuthenticated$()
    .pipe(
      map((isAuthenticated) =>
        isAuthenticated ? true : router.parseUrl("/login")
      )
    );
};