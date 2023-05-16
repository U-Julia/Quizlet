import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isUserLoggedIn: boolean = false;


  constructor() { }
}
