import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Movie } from '../interfaces/movie.interface';

@Component({
  selector: 'app-watched-movies',
  templateUrl: './watched-movies.component.html',
  styleUrls: ['./watched-movies.component.css']
})
export class WatchedMoviesComponent {

  watchedMovies: Movie [] = [];

  constructor(private AuthService: AuthService){}

  ngOnInit (): void {

    this.AuthService.getUserWatched().subscribe(movies => {

      this.watchedMovies = movies;
      
      console.log('peliculas vistas desde el movie component' + movies );
    });

  }


}
