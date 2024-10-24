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

  getTrendingMovies() : Observable<any> {
    const URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.apiKey}&language=es`;

    return this.http.get(URL);
  }


  searchMoviesAndSeries(query: string): Observable<any> {
    const URL = `${this.baseUrl}/search/multi?api_key=${this.apiKey}&query=${query}&language=es`;
    return this.http.get(URL);
  }


