import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { SearchboxComponent } from '../searchbox/searchbox.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public image:String = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg';
  public username: string | null = '';

  searchTermi: string = '';

  constructor(public AuthService: AuthService, private router: Router) {
    //this.username = this.AuthService.getUsername();
  }

  ngOnInit(): void {
    this.username = this.AuthService.getUsername();
  }

  logout(): void {
    if (this.router.url === '/'){

      window.location.reload();

    }else{
      
      this.router.navigate(['']);
    }

    this.AuthService.logOut();
    
  }


}
 