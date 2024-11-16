import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-favorites-movies',
  templateUrl: './favorites-movies.component.html',
  styleUrls: ['./favorites-movies.component.css']
})
export class FavoritesMoviesComponent implements OnInit {

  favoritesMovies: Movie[] = [];

  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {
    this.cargarPeliculasFavoritas();

    this.AuthService.favoritesUpdated$.subscribe(() => {
      this.cargarPeliculasFavoritas();
    })
  }

  cargarPeliculasFavoritas(): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.AuthService.getUserFavorites(userId).subscribe(movies => {
        this.favoritesMovies = movies;
        console.log('Películas favoritas desde el componente:', this.favoritesMovies);
      })
    }
  }
}
