import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public trendingMoviesResults: Movie[] = [];
  public actionMoviesResults: Movie [] = [];
  public fantasyMoviesResults: Movie[] = [];
  public dramaMoviesResults: Movie[] = [];
  public misteryMoviesResults: Movie[] = [];
  public documentalMoviesResults: Movie[] = [];
  public suspensoMoviesResults: Movie[] = [];
  public crimenMoviesResults: Movie[] = [];
  public comedyMoviesResults: Movie[] = [];
  public cienciaFiccionMoviesResults: Movie[] = [];

  constructor(private movieServices: MoviesService, private AuthService: AuthService){}
  
  estaLogueado: boolean = false;

  ngOnInit():void{

    this.estaLogueado = this.AuthService.isLoggedIn();

    this.actionMovies();
    this.comedyMovies();
    this.fantasyMovies();
    this.dramaMovies();
    this.misteryMovies();
    this.documentalMovies();
    this.suspensoMovies();
    this.crimenMovies();
    this.cienciaFiccionMovies();
  }

  actionMovies (){
    this.movieServices.getActionTrendingMovies().subscribe((result) =>{
      this.actionMoviesResults = result.results;
    });
  }

  comedyMovies(){
    this.movieServices.getComedyTrendingMovies().subscribe((result)=>{
      this.comedyMoviesResults = result.results;
    })
  }

  fantasyMovies (){
    this.movieServices.getFantasyTrendingMovies().subscribe((result) =>{
      this.fantasyMoviesResults = result.results;
    });
  }

  dramaMovies (){
    this.movieServices.getDramaTrendingMovies().subscribe((result) =>{
      this.dramaMoviesResults = result.results;
    });
  }

  misteryMovies (){
    this.movieServices.getMisteryTrendingMovies().subscribe((result) =>{
      this.misteryMoviesResults = result.results;
    });
  }

  documentalMovies (){
    this.movieServices.getDocumentalTrendingMovies().subscribe((result) =>{
      this.documentalMoviesResults = result.results;
    });
  }

  suspensoMovies(){
    this.movieServices.getSuspensoTrendingMovies().subscribe((result)=>{
      this.suspensoMoviesResults = result.results;
    });
  }

  crimenMovies(){
    this.movieServices.getCrimenTrendingMovies().subscribe((result)=> {
      this.crimenMoviesResults = result.results;
    });
  }

  cienciaFiccionMovies(){
    this.movieServices.getCienciaFiccionTrendingMovies().subscribe((result)=>{
      this.cienciaFiccionMoviesResults = result.results;
    });
  }

  scrollLeft(rowId: string) {
    const row = document.getElementById(rowId);
    if (row) {
      row.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }
  
  scrollRight(rowId: string) {
    const row = document.getElementById(rowId);
    if (row) {
      row.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }   


}
