import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  public paises: any[] = [];
  public nuevasCanciones: any[] = [];
  public loading: boolean;
  public error: boolean;
  public errorMessage: string;
  public token:any;
  constructor(private _spotifyService: SpotifyService) {
    this.loading = true;
    this.error = false;
    this._spotifyService.getToken()
    .subscribe(data =>{this.token = data;
      this._spotifyService.getNewReleases(this.token).subscribe(
        (data: any) => {
          this.nuevasCanciones = data;
          this.loading = false;
        },
        (errorServicio) => {
          this.loading = false;
          this.error = true;
          this.errorMessage = errorServicio.error.error.message;
        }
      );
    });
  
  }

  ngOnInit(): void {}
}
