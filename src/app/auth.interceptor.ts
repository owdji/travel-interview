import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { first, switchMap } from "rxjs";
import { AuthService } from "./security/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get the instance of the AuthService
  const auth = inject(AuthService);

  // Get the bearer token (if any).
  return auth.getToken$().pipe(
    // first() will re-emit the first emitted value of the source Observable
    // (here, getToken$()), then complete. An Obseravble returned by an Interceptor
    // MUST complete at some point, otherwise the intercepted request will be forever hanging
    first(),
    switchMap((token) => {
      // Add it to the request if it doesn't already have an Authorization header.
      if (token && !req.headers.has("Authorization")) {
        req = req.clone({
          headers: req.headers.set("Authorization", `Bearer ${token}`),
        });
      }
      return next(req);
    })
  );
};