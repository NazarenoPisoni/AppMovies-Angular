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

  constructor(
    private router: ActivatedRoute,
    private movieServices: MoviesService
  ) {}

  ngOnInit(): void {
    let movieId = this.router.snapshot.paramMap.get('id');

    this.getDetailsById(movieId);
  }

  getDetailsById(movieId:any){
    this.movieServices.getMovieDetails(movieId).subscribe(async(result)=>{
      this.movieDetails = await result;
    });



  }

}

