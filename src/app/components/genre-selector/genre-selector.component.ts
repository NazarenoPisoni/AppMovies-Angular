import { MoviesService } from 'src/app/services/movies.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre-selector',
  templateUrl: './genre-selector.component.html',
  styleUrls: ['./genre-selector.component.css'],
})
export class GenreSelectorComponent implements OnInit {
  genres: { id: number; name: string }[] = [];

  constructor(private MoviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.MoviesService.getGenres().subscribe((data) => {
      this.genres = data.genres;
    });
  }

  onGenreSelect(genreId: number): void {
    this.router.navigate(['/movies-por-genero', genreId]); // Redirige al componente de películas
  }
}
