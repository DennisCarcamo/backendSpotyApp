import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private httpClient: HttpClient) {}

  getToken():Observable<string> {
    const url ='http://127.0.0.1:3000/spotify/bfaf911e8bb2447ebfe96db4c40e1a6e/62bee61a18f24b70b06437209db0f565';
    return this.httpClient.get(url).pipe(map((data: any) => data.access_token));
  }

  getQuery(query: string, token:string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer '+token,
    });
    return this.httpClient.get(url, { headers });
  }

  getNewReleases(token:string) {
    //const headers = new HttpHeaders({
    //  'Authorization':'Bearer BQCP7OGaRfjFbETw8GINmOnJCbVUTcC6y3_OsqckSwEAY2Q4Kv49PRkbkwChApHHdh1c4UvWnWGv5NyIGBk'
    //});
    //return this.httpClient.get('https://api.spotify.com/v1/browse/new-releases?limit=20',{headers})
    //            .pipe( map (data=>data['albums'].items));
    return this.getQuery('browse/new-releases?limit=20',token)
    .pipe(map((data) => data['albums'].items));
  }

  getArtits(terminoBusqueda: string, token:string) {
    //const headers = new HttpHeaders({
    //  'Authorization':'Bearer BQCP7OGaRfjFbETw8GINmOnJCbVUTcC6y3_OsqckSwEAY2Q4Kv49PRkbkwChApHHdh1c4UvWnWGv5NyIGBk'
    //});
    //return this.httpClient.get(`https://api.spotify.com/v1/search?q=${terminoBusqueda}&type=artist&limit=20`,{headers})
    //            .pipe(map(data => data['artists'].items));
    return this.getQuery(
      `search?q=${terminoBusqueda}&type=artist&limit=20`,token
    ).pipe(map((data) => data['artists'].items));
  }

  getArtist(id: string, token:string) {
    return this.getQuery(`artists/${id}`,token);
    //.pipe(map(data=> data['artists'].items));
  }

  getTopTracks(id: string,token:string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`,token
    ).pipe(map((data) => data['tracks'])
    );
    //.pipe(map(data=> data['artists'].items));
  }
}