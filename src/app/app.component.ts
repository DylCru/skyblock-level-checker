import { Component } from '@angular/core';
import { PlayerComponent } from './player/player.component';
import { FormsModule } from '@angular/forms';
import { PromotionCheckerComponent } from './promotion-checker/promotion-checker.component';
import { PlayerDataService } from './player/player-data.service';
import { guildPlayer } from './guildPlayer';
import { playerProfiles } from './playerProfiles';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlayerComponent, FormsModule, PromotionCheckerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Skyblock Level Checker';
  checkRequirements = true
  guildData: any[] = []
  guildSize: number = 0;
  players: guildPlayer[] = []
  skyblockPlayers: playerProfiles[] = []

  constructor(private playerDataService: PlayerDataService) {
  }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.playerDataService.getGuild().subscribe(res => {
      this.guildData = res.guild['members']
      this.guildSize = res.guild['members'].length
      this.loadPlayers()
    })
  }

  loadPlayers() {
    console.log(this.guildData)
    for (const p of this.guildData) {
      this.players.push({
        uuid: p.uuid,
        rank: p.rank
      })
    }
  }

  getPlayerData() {
    for (let p of this.players) {
      let name: string
      this.playerDataService.getPlayerName(p.uuid).subscribe(res => {
        name = res.username
        this.playerDataService.getSkyblockData(p.uuid).subscribe(data => {
          this.skyblockPlayers.push({
            uuid: p.uuid,
            name: name,
            experience: this.getPlayerProfileLevels(data.profiles, p, name),
            highestLevel: Math.max(...this.getPlayerProfileLevels(data.profiles, p, name)),
            guildRank: p.rank
          })
          this.loadIntoLocalStorage(p.uuid)
        })
      })
    }
  }

  getPlayerProfileLevels(profiles: any, p: guildPlayer, name: string): number[] {
    let xp: number[] = []
    for (let i of profiles) {
      try {
        xp.push(i.members[p.uuid].leveling.experience)
      } catch {
        console.log(`ERROR: Couldnt push profile for ${name} (api probably off): `, i)
      }
    }
    return xp
  }

  loadIntoLocalStorage(uuid: string) {
    for (let i of this.skyblockPlayers) {
      localStorage.setItem(uuid, JSON.stringify(i))
    }
  }

  loadTime() {
    const time = new Date().toISOString()

    localStorage.setItem('timestamp', time)
  }

  getTimeStamp() {
    return localStorage.getItem('timestamp')
  }

  getPlayerProfileFromStorage() {
    for (let i of this.players) {
      const player = localStorage.getItem(i.uuid)
      
    }
  }

  logLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        console.log(`Key: ${key}, Value: ${value}`);
      }
    }
  }
}
