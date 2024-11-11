import { MoviesService } from './../services/movies.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie.interface';

@Component({
  selector: 'app-favorites-movies',
  templateUrl: './favorites-movies.component.html',
  styleUrls: ['./favorites-movies.component.css']
})
export class FavoritesMoviesComponent {

  favoritesMovies: Movie [] = [];

  constructor(private AuthService: AuthService){}

  ngOnInit (): void {

    this.AuthService.getUserFavorites().subscribe(movies => {

      this.favoritesMovies = movies;
      
      console.log('peliculas favoritas desde el movie component' + movies );
    });

  }


}
