import { Component } from '@angular/core';
import { PlayerDataService } from './player-data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { playerProfiles } from '../playerProfiles';
import copy from 'copy-to-clipboard';
import { NgbProgressbarModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TestData } from './TestData';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [HttpClientModule, NgIf, NgFor, NgbTooltip, NgbProgressbarModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})

export class PlayerComponent {
  data: any[]
  skyblockPlayers: playerProfiles[]
  belowReq: playerProfiles[]
  loaded: boolean
  guildSize: number = 0
  staffRole: string
  kickReason: string = "";
  levelReq: number = 0;

  constructor(private playerDataService: PlayerDataService) {
    this.data = []
    this.skyblockPlayers = []
    this.belowReq = []
    this.loaded = false
    this.staffRole = 'Staff'

    //this.belowReq = TestData  
  }

  ngOnInit() {
    console.log('init')
    this.loadDataFromStorage()
  }

  loadDataFromStorage() {
      for (let i = 0; i < localStorage.length; i++) {
        const uuid = localStorage.key(i)
        if (uuid && uuid !== 'timestamp' && uuid !== 'cooldown') {
          const playerData = JSON.parse(localStorage.getItem(uuid)!) as playerProfiles
          this.skyblockPlayers.push(playerData)
        }
      }
  }

  checkRequirement(profiles: playerProfiles[], levelReq: number) {
    this.belowReq = []
    for (let p of profiles) {
      if (!(p.guildRank === this.staffRole)) {
        if (p.highestLevel < levelReq) {
          this.belowReq.push(p)
        }
      }
    }
  }

  copyKickCommand(name: string) {
    console.log(this.kickReason)
    copy(`/g kick ${name} ${this.kickReason}`)
  }
}