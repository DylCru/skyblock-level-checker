import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
        'API-Key': 'bc4e4843-b226-41f8-a0f2-e70534e643be'
      }
    })
  }

  getSkyblockData(uuid: string): Observable<any> {
    return this.http.get(
      'https://api.hypixel.net/v2/skyblock/profiles',
     {params: {uuid: uuid},
      headers: {
        'API-Key': 'bc4e4843-b226-41f8-a0f2-e70534e643be'
      }
    })
  }

  getPlayerName(uuid: string): Observable<any> {
    return this.http.get(
      `https://api.ashcon.app/mojang/v2/user/${uuid}`
    )
  }
}