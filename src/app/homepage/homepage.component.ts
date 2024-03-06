// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-homepage',
//   standalone: true,
//   imports: [],
//   templateUrl: './homepage.component.html',
//   styleUrl: './homepage.component.css'
// })
// export class HomepageComponent {

// }

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlayerDataService } from '../player/player-data.service';
import { guildPlayer } from '../guildPlayer';
import { playerProfiles } from '../playerProfiles';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgbAlert, RouterLink, RouterOutlet],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  checkRequirements = true
  guildData: any[] = []
  guildSize: number = 0;
  players: guildPlayer[] = []
  skyblockPlayers: playerProfiles[] = []
  cooldown: string = 'Never!'
  clickedOnCooldown: boolean = false

  constructor(private playerDataService: PlayerDataService) {}

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
    if (this.checkCooldown()) {
      this.clickedOnCooldown = true
      return
    }

    this.setCooldown()
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
        if (i.members[p.uuid].leveling.experience != null) {
          xp.push(i.members[p.uuid].leveling.experience)
        }
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

  setCooldown() {
    const time = new Date()
    const coolDown = new Date(time.getTime() + (60000 * 5))

    localStorage.setItem('timestamp', time.toISOString())
    localStorage.setItem('cooldown', coolDown.toISOString())
  }

  getTimeClicked() {
    const time = new Date(localStorage.getItem('timestamp')!)
    if (time.getFullYear() === 1970) {
      return 'Never!'
    }
    return `${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}${time.getMinutes() === 0 ? '0' : ''}:${time.getSeconds() < 10 ? '0' : ''}${time.getSeconds()}${time.getSeconds() === 0 ? '0' : ''}`
  }

  getCooldown() {
    const time = new Date(localStorage.getItem('cooldown')!)

    return `${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}${time.getMinutes() === 0 ? '0' : ''}:${time.getSeconds() < 10 ? '0' : ''}${time.getSeconds()}${time.getSeconds() === 0 ? '0' : ''}`
  }

  checkCooldown() {
    const now = new Date()
    const cooldown = new Date(localStorage.getItem('cooldown')!)
    console.log(now)
    console.log(cooldown)

    if ((now > cooldown) || cooldown.getFullYear() === 1970) {
      console.log('false')
      return false
    } 
    console.log('true')
    return true
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

  clearLocalStorage() {
    localStorage.clear()
    console.log('cleared')
  }
}

