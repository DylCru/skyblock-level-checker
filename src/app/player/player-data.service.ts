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
        'API-Key': 'bf44c24d-a7c5-4307-bb94-287cb7441f16'
      }
    })
  }

  getSkyblockData(uuid: string): Observable<any> {
    return this.http.get(
      'https://api.hypixel.net/v2/skyblock/profiles',
     {params: {uuid: uuid},
      headers: {
        'API-Key': 'bf44c24d-a7c5-4307-bb94-287cb7441f16'
      }
    })
  }

  getPlayerName(uuid: string): Observable<any> {
    return this.http.get(
      `https://api.ashcon.app/mojang/v2/user/${uuid}`
    )
  }
}