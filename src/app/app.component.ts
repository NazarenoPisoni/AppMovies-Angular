import { Component } from '@angular/core';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'This is an App for Movie\'s fans';

  constructor(private movieService: MoviesService) {};

  ngOnInit() {
    this.movieService.getTrendingMovies().subscribe(response=> {
      console.log(response);
    });
  }
  
}
  