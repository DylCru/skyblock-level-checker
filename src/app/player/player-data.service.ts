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
        'API-Key': '167d6740-ddd9-4c58-8508-47a371f5afa1'
      }
    })
  }

  getSkyblockData(uuid: string): Observable<any> {
    return this.http.get(
      'https://api.hypixel.net/v2/skyblock/profiles',
     {params: {uuid: uuid},
      headers: {
        'API-Key': '167d6740-ddd9-4c58-8508-47a371f5afa1'
      }
    })
  }

  getPlayerName(uuid: string): Observable<any> {
    return this.http.get(
      `https://api.ashcon.app/mojang/v2/user/${uuid}`
    )
  }
}