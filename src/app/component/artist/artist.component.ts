import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../../services/movie-api.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  public listaArtistas: any[];
  public dataArtista: any;

  constructor(private service: MovieApiService) {
    this.service.getJsonArtistas().subscribe( (data: any) => {
      this.listaArtistas = data.results;
      this.dataArtista = this.listaArtistas[0];
    });
  }

  ngOnInit() {
  }

  displayInfo(id: number) {
    this.dataArtista = this.listaArtistas[id];
  }

}
