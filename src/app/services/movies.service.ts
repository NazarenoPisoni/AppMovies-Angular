import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiKey: string = '02319fe9ef3d0c1d5fefc135738475bb';
  private baseUrl: string = 'https://api.themoviedb.org/3';


  constructor(private http : HttpClient) { }

  /* Solicitudes a apis para la carga de la home page */

  getTrendingMovies() : Observable<any> {
    const URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.apiKey}&language=es`;

    return this.http.get(URL);
  }

  getActionTrendingMovies() : Observable<any>{
    const URL = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=28&language=es`;

    return this.http.get(URL);
  }

  getFantasyTrendingMovies() : Observable<any>{
    const URL = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=14&language=es`;

    return this.http.get(URL);
  }

  getDramaTrendingMovies() : Observable<any>{
    const URL = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=18&language=es`;

    return this.http.get(URL);
  }

  getMisteryTrendingMovies() : Observable<any>{
    const URL = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=9648&language=es`;

    return this.http.get(URL);
  }

  getDocumentalTrendingMovies() : Observable<any>{
    const URL = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=99&language=es`;

    return this.http.get(URL);
  }


  getSuspensoTrendingMovies() : Observable<any>{
    const URL = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=53&language=es`;

    return this.http.get(URL);
  }

  getCrimenTrendingMovies() : Observable<any>{
    const URL = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=80&language=es`;

    return this.http.get(URL);
  }


  getComedyTrendingMovies() : Observable<any>{
    const URL = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=35&language=es`;

    return this.http.get(URL);
  }

  getCienciaFiccionTrendingMovies() : Observable<any>{
    const URL = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=878&language=es`;

    return this.http.get(URL);
  }

  
  /*buscar peliculas*/
  searchMoviesAndSeries(query: string): Observable<any> {
    const URL = `${this.baseUrl}/search/multi?api_key=${this.apiKey}&query=${query}&language=es`;
    return this.http.get(URL);
  }


  /* Traer detalles de peliculas */

  getMovieDetails (id:any): Observable<any> {
    const URL = (`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=es`);
    return this.http.get(URL);
  }

  
  
}