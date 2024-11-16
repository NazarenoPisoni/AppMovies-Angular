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
    const userId = localStorage.getItem('id'); // Obtén el ID del usuario desde el localStorage
    if (userId) {
      this.AuthService.getUserFavorites(userId).subscribe(movies => {
        this.favoritesMovies = movies; // Asigna los detalles de las películas favoritas
        console.log('Películas favoritas desde el componente:', movies);
      });
    }
  }
}
