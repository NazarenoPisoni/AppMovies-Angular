import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  public movieDetails: any;
    
  estaLogueado = false;

  constructor(
    private router: ActivatedRoute,
    private movieServices: MoviesService,
    private AuthService: AuthService
  ) {}



  ngOnInit(): void {

    let movieId = this.router.snapshot.paramMap.get('id');

    this.getDetailsById(movieId);

    this.estaLogueado = this.AuthService.isLoggedIn();

  }

  getDetailsById(movieId:any){
    
    this.movieServices.getMovieDetails(movieId).subscribe((result)=>{
      this.movieDetails = result;
    });

  }

  markAsView (){

    if (this.estaLogueado){

    }else{

    }
  }

  addToFavorites (){
    
    if(this.estaLogueado){

    }
    else{

    }
  }

}

