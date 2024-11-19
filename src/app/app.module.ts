import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FilmDetailsComponent } from './components/pages/film-details/film-details.component';
import { SearchResultsComponent } from './components/pages/search-results/search-results.component';
import { LoginComponent } from './auth/login/login.component';
import { SingUpComponent } from './auth/sing-up/sing-up.component';
import { FooterComponent } from './components/footer/footer.component';
import { WatchedMoviesComponent } from './watched-movies/watched-movies.component';
import { FavoritesMoviesComponent } from './components/favorites-movies/favorites-movies.component';
import { GenreSelectorComponent } from './components/genre-selector/genre-selector.component';
import { MoviesPorGeneroComponent } from './components/movies-por-genero/movies-por-genero.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    SearchboxComponent,
    HomeComponent,
    FilmDetailsComponent,
    SearchResultsComponent,
    LoginComponent,
    SingUpComponent,
    FooterComponent,
    WatchedMoviesComponent,
    FavoritesMoviesComponent,
    GenreSelectorComponent,
    MoviesPorGeneroComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 
 