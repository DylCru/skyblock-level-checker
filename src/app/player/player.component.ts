import { Component } from '@angular/core';
import { PlayerDataService } from './player-data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import type { guildPlayer } from './guildPlayer';
import { Data } from '@angular/router';

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

  constructor(private playerDataService: PlayerDataService) {
    this.players = []
    this.data = []
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

}