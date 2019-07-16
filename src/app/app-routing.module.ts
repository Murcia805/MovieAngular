import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { HomeComponent } from './component/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './component/search/search.component';
import { MovieComponent } from './component/movie/movie.component';
import { ArtistComponent } from './component/artist/artist.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'artistas', component: ArtistComponent},
  {path: 'search/:termino', component: SearchComponent},
  {path: 'movie', component: MovieComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
