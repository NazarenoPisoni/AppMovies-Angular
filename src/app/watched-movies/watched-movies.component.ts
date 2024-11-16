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

    const userId = localStorage.getItem('id');
    if (userId) {
      this.AuthService.getUserWatchedWithDetails(userId).subscribe(movies => {
        this.watchedMovies = movies;
        console.log('Peliculas vistas: ' , movies);
      })
    }

  }


}
