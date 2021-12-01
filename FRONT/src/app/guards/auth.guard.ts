import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

  constructor(
    private router: Router
  ){}

  // isUserLoggedIn = localStorage.getItem('token');

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!localStorage.getItem('token')){
      console.log(localStorage.getItem('token'));
      this.router.navigate(['login']);
    }

    return !!localStorage.getItem('token');
  }

}