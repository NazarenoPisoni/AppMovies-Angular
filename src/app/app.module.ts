import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FilmDetailsComponent } from './components/pages/film-details/film-details.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    SearchboxComponent,
    HomeComponent,
    FilmDetailsComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 
 