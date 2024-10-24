import { Component } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent {
  searchTerm: string = '';
  results: any[] = [];  

  constructor(private moviesService: MoviesService) {} // Inyecta el servicio

  // Método para manejar la búsqueda
  searchMovies() {
    if (this.searchTerm.trim() === '') {
      return; // No hacer nada si la búsqueda está vacía
    }

    this.moviesService.searchMoviesAndSeries(this.searchTerm).subscribe(
      (response: any) => {
        console.log('Resultados de la búsqueda:', response);
        this.results = response.results;
      },
      (error) => {
        console.error('Error en la búsqueda:', error);
      }
    );
  }
}


