import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {

    constructor(private router: Router) {
    }

    public async canActivate(): Promise<boolean> {
      const token = localStorage.getItem('token');
      if (token) {
        return true;
      } else {
        await this.router.navigate(['./login']);
        return false;
      }
    }
}
