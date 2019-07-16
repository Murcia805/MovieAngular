import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiService } from '../../services/movie-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  providers: [NgbCarouselConfig]
})
export class MovieDetailComponent implements OnInit {

  public idData: string[];
  public infoMovie: any;
  public videoInfo: any;
  public listSimilar: any[];

  public name: string;

  private youtubeURL = 'https://www.youtube.com/embed/';

  constructor(private route: Router,
              private service: MovieApiService,
              private activateRoute: ActivatedRoute,
              public sanitizer: DomSanitizer,
              private config: NgbCarouselConfig) {
    config.interval = 3000;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.activateRoute.params.subscribe( params => {
      this.idData = params[ 'id' ].split('-');
      console.log(this.idData[0]);
      if ( this.idData[0] == 'MV') {
        this.name = 'Peliculas';
        this.service.getJsonById(this.idData[1]).subscribe( (data: any) => {
          this.infoMovie = data;
          this.service.getJsonVideoById(this.idData[1]).subscribe( (dataVideo: any) => {
            this.videoInfo = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeURL + dataVideo);
          });
          this.service.getJsonSimilarById(this.idData[1]).subscribe( (dataSimilars: any) => {
            this.listSimilar = dataSimilars.results;
          });
        });
      } else if (this.idData[0] == 'SR') {
        this.name = 'Series';
        this.service.getJsonSeriesById(this.idData[1]).subscribe( (data: any) => {
          this.infoMovie = data;
          this.service.getJsonVideoSerieById(this.idData[1]).subscribe( (dataVideo: any) => {
            this.videoInfo = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeURL + dataVideo);
          });
          this.service.getJsonSeriesSimilarById(this.idData[1]).subscribe( (dataSimilars: any) => {
            console.log(dataSimilars.results);
            if (dataSimilars.results.length != 0) {
              this.listSimilar = dataSimilars.results;
            }
          });
        });
      } else {
        this.route.navigate(['/movie']);
      }
    });
  }

  getVideoInfo() {
    return this.videoInfo;
  }

  getInfoMovie(id: string) {
    alert(id);
  }

}
