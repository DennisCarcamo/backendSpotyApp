import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [],
})
export class ArtistaComponent {
  public loading: boolean;
  public artista: any = {};
  public topTracks: any[] = [];
  public token = '';
  constructor(
    private activatedRoutes: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {
    this.activatedRoutes.params.subscribe((params) => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtista(id: string) {
    this.loading = true;
    this.spotifyService.getToken().subscribe((data) => {
      this.token = data;
      this.spotifyService.getArtist(id, this.token).subscribe((artista) => {
        this.artista = artista;
        this.loading = false;
      });
    });
  }

  getTopTracks(id: string) {
    this.spotifyService.getToken().subscribe((data) => {
      this.token = data;
      this.spotifyService
        .getTopTracks(id, this.token)
        .subscribe((topTracks) => {
          this.topTracks = topTracks;
        });
    });
  }
}
