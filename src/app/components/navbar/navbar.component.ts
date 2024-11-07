import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { SearchboxComponent } from '../searchbox/searchbox.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public image:String = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg';

  searchTermi: string = '';

  constructor(public AuthService: AuthService, private router: Router) {}

  logout(): void {
    this.AuthService.logOut();
    this.router.navigate(['/home']);
  }


}
 