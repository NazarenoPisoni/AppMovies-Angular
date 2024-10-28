import { Component } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent {
  searchTerm: string = '';
  results: any[] = [];  

  constructor(private moviesService: MoviesService, private router: Router) {} 
 
  
  searchMovies() {
    if (this.searchTerm.trim() === '') {
      return; //manejo busqueda vacia
    }
    

    this.router.navigate(['/searchResult'], { queryParams: { query: this.searchTerm } });

    /* this.moviesService.searchMoviesAndSeries(this.searchTerm).subscribe(
      (response: any) => {
        console.log('Resultados de la búsqueda:', response);
        this.results = response.results;
        this.router.navigate(['/searchResult'], { queryParams: { query: this.searchTerm } });
      },
      (error) => {
        console.error('Error en la búsqueda:', error);
      }
    ); */
  }
}


