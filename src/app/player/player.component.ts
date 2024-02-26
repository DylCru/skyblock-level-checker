import { Component } from '@angular/core';
import { PlayerDataService } from './player-data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import type { guildPlayer } from './guildPlayer';
import { playerProfiles } from './playerProfiles';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [HttpClientModule, NgIf, NgFor],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})

export class PlayerComponent {
  data: any[]
  players: guildPlayer[]
  skyblockPlayers: playerProfiles[]

  constructor(private playerDataService: PlayerDataService) {
    this.players = []
    this.data = []
    this.skyblockPlayers = []
  }

   ngOnInit() {
    this.getData()
  }

  getData() {
    this.playerDataService.getGuild().subscribe(res => {
      this.data = res.guild['members']
      this.loadPlayers()
    })
  }

  loadPlayers() {
    for (const p of this.data) {
      this.players.push({
        uuid: p.uuid,
        rank: p.rank
      })
    }
  }

  getPlayerData(p: guildPlayer) {
    let name: string
    this.playerDataService.getPlayerName(p.uuid).subscribe(res => {
      name = res.username
      this.playerDataService.getSkyblockData(p.uuid).subscribe(res => {
        this.skyblockPlayers.push({
          uuid: p.uuid,
          name: name,
          experience: res.profiles[0].members[p.uuid].leveling.experience
        })
      })
    })
  }
}