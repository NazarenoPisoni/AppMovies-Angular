import { Component } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public trendingMoviesResults: any[] = [];
  public actionMoviesResults: any [] = [];
  public fantasyMoviesResults: any[] = [];
  public dramaMoviesResults: any[] = [];
  public misteryMoviesResults: any[] = [];
  public documentalMoviesResults: any[] = [];
  public suspensoMoviesResults: any[] = [];
  public crimenMoviesResults: any[] = [];
  public comedyMoviesResults: any[] = [];
  public cienciaFiccionMoviesResults: any[] = [];

  constructor(private movieServices: MoviesService){}

  ngOnInit():void{
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
    


}
