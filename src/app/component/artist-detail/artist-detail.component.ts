import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../../services/movie-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {
  
  public idArtista: any;
  public artistData: any;
  public listPeliculasArtista: any;
  public listSeriesArtista: any;

  constructor(private service: MovieApiService,
              private route: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.params.subscribe( params => {
      this.idArtista = params['id'];
      this.service.getJsonArtistaById(this.idArtista).toPromise()
      .then( (data: any) => {
        this.artistData = data;
      })
      .then( () => {
        this.service.getJsonArtistaMoviesById(this.idArtista).subscribe( (dataMoviesArtist: any) => {
          this.listPeliculasArtista = dataMoviesArtist.cast;
        });
        this.service.getJsonArtistaSeriesById(this.idArtista).subscribe( (dataSeriesArtist: any) => {
          this.listSeriesArtista = dataSeriesArtist.cast;
        });
      });
    });
  }

  getInfoMovie(id: string) {
    this.route.navigate(['/movie', 'MV-' + id]);
  }

  getInfoSerie(id: string) {
    this.route.navigate(['/movie', 'SR-' + id]);
  }
}
