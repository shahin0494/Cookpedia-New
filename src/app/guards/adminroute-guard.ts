import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminrouteGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  const user = JSON.parse(sessionStorage.getItem("user") || "")
  if (user.role == "admin") {
    return true
  } else {
    router.navigateByUrl("/")
    return false;
  }
};
