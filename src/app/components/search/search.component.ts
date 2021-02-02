import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  public artistas: any[] = [];
  public loading: boolean;
  public token = '';
  constructor(private _spotifyService: SpotifyService) {}

  buscar(termino: string) {
    if (termino != '') {
      this.loading = true;
      this._spotifyService.getToken().subscribe((data) => {
        this.token = data;
        this._spotifyService
          .getArtits(termino, this.token)
          .subscribe((data: any) => {
            this.artistas = data;
            this.loading = false;
          });
      });
    }
  }
}
