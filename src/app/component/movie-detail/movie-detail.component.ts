import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiService } from '../../services/movie-api.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  public idData: string[];
  public infoMovie: any;
  public videoInfo: string;

  constructor(private route_: Router,
    private service: MovieApiService, 
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.params.subscribe( params => {
      this.idData = params[ 'id' ].split('-');
      console.log(this.idData[0]);
      if ( this.idData[0] == 'MV') {
        this.service.getJsonById(this.idData[1]).subscribe( (data: any) => {
          this.infoMovie = data;
          this.service.getJsonVideoById(this.idData[1]).subscribe( (dataVideo: any) => {
            this.videoInfo = dataVideo;
          });
        });
      }else if (this.idData[0] == 'SR') {
        this.service.getJsonSeriesById(this.idData[1]).subscribe( (data: any) => {
          this.infoMovie = data;
          this.service.getJsonVideoSerieById(this.idData[1]).subscribe( (dataVideo: any) => {
            this.videoInfo = dataVideo;
          });
        })
      }else {
        this.route_.navigate(['/movie']);
      }
      
    });
  }

}
