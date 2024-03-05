import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PlayerDataService {

  constructor(private http: HttpClient) { }

  getGuild(): Observable<any> {
    return this.http.get(
      'https://api.hypixel.net/v2/guild',
     {params: {name: 'DaySleepers'},
      headers: {
        'API-Key': environment.apikey
      }
    })
  }

  getSkyblockData(uuid: string): Observable<any> {
    return this.http.get(
      'https://api.hypixel.net/v2/skyblock/profiles',
     {params: {uuid: uuid},
      headers: {
        'API-Key': environment.apikey
      }
    })
  }

  getPlayerName(uuid: string): Observable<any> {
    return this.http.get(
      `https://api.ashcon.app/mojang/v2/user/${uuid}`
    )
  }
}