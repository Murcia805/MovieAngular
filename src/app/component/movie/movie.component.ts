import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../../services/movie-api.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public movies: any[] = [];

  public dataMovie: any;

  constructor(private service: MovieApiService) {
    this.service.getJson().subscribe( (data: any) => {
      console.log(data);
      this.movies = data.results;
      this.dataMovie = data.results[0];
   });
  }

  displayInfo(id: number) {
    alert(id);
    this.dataMovie = this.movies[id];
  }

  ngOnInit() {
  }

}
