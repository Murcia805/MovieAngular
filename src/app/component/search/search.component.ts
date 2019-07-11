import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from '../../services/movie-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public titleSearch = '';
  public dataMovies: any[] = [];

  constructor(private service: MovieApiService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.params.subscribe( params => {
      console.log(params[ 'termino' ]);
      this.titleSearch = params[ 'termino' ];
      this.service.getJsonByName(params[ 'termino' ]).subscribe((data: any) => {
        console.log(data);
        this.dataMovies = data.results;
      });
    });
  }

}
