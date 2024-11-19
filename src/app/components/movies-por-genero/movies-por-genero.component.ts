import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies-por-genero',
  templateUrl: './movies-por-genero.component.html',
  styleUrls: ['./movies-por-genero.component.css']
})
export class MoviesPorGeneroComponent {
  genreId!: number;
  movies: any[] = [];

  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.genreId = +params['id']; // Obtén el id del género desde la URL
      this.getMoviesByGenre();
    });
  }

  getMoviesByGenre(): void {
    const url = `${this.apiUrl}?with_genres=${this.genreId}`;
    this.http.get<any>(url).subscribe((data) => {
      this.movies = data.results;
    });
  }
}
