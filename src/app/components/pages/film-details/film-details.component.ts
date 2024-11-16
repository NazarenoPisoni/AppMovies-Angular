import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {

    
  estaLogueado = false;
  disableView: boolean = true;
  disableFavorite: boolean = true;
  
  private userId: string | null = null;
  public movieDetails: any;
  isFavorite: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private movieServices: MoviesService,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {

    let movieId = this.router.snapshot.paramMap.get('id');


    this.getDetailsById(movieId);

    this.estaLogueado = this.AuthService.isLoggedIn();

    this.userId = localStorage.getItem('id'); 

    this.checkIfFavorite();

    //console.log('id desde details components' + this.userId);

  }


  getDetailsById(movieId: any) {
    this.movieServices.getMovieDetails(movieId).subscribe(result => {

      this.movieDetails = result;
      this.movieServices.checkAndAddMovie(result).subscribe();

      //console.log(this.movieDetails?.backdrop_path); 
      this.checkIfFavorite();

    });
  }

  markAsView (){
    if (this.estaLogueado && this.userId) {
      this.AuthService.markAsWatched(this.userId, this.movieDetails.id).subscribe();
      alert ('Pelicula agregada como vista');
      this.disableView = false;
    }
  }

  addToFavorites (){
    
    if (this.estaLogueado && this.userId) {
      this.AuthService.addToFavorites(this.userId, this.movieDetails.id).subscribe();
      this.disableFavorite = false;
    }    

  } 

  checkIfFavorite(): void { 
    if (this.estaLogueado && this.userId)
       { this.AuthService.getUserFavorites(this.userId).subscribe(favoriteMovies => 
        { 
          // Verifica si la película actual está en la lista de favoritos
          this.isFavorite = favoriteMovies.some(movie => movie.id === this.movieDetails.id); 
        }); 
      } 
    }

  eliminarDeFavorites() {
    if (this.estaLogueado && this.userId) {
      this.AuthService.eliminarDeFavs(this.userId, this.movieDetails.id).subscribe(() => {
        this.isFavorite = false;
      });
      this.isFavorite = false;
    }    
  }
  

  
}

