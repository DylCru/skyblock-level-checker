import { Component } from '@angular/core';
import { PlayerDataService } from './player-data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import type { guildPlayer } from './guildPlayer';
import { playerProfiles } from './playerProfiles';
import copy from 'copy-to-clipboard';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [HttpClientModule, NgIf, NgFor, NgbTooltip],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})

export class PlayerComponent {
  data: any[]
  players: guildPlayer[]
  skyblockPlayers: playerProfiles[]
  belowReq: playerProfiles[]
  testPlayer: playerProfiles[]
  loaded: boolean
  guildSize: number = 0
  staffRoles: String[]

  constructor(private playerDataService: PlayerDataService) {
    this.players = []
    this.data = []
    this.skyblockPlayers = []
    this.belowReq = []
    this.loaded = false
    this.staffRoles = ["Mod", "NightWatch", "Guild Master"]

    this.testPlayer = [{
      uuid: 'bf4fba4359bb44ffb58f37c6b4940333',
      name: 'Rain_stxrm',
      experience: [23213, 4324, 13213, 5322],
      highestLevel: 23213,
      guildRank: 'Nightwatch'
    },{
      uuid: 'bf4fba4359bb44ffb58f37c6b4940333',
      name: 'Rain_stxrm',
      experience: [23213, 4324, 13213, 5322],
      highestLevel: 23213,
      guildRank: 'Insomniac'
    },{
      uuid: 'bf4fba4359bb44ffb58f37c6b4940333',
      name: 'Rain_stxrm',
      experience: [23213, 4324, 13213, 5322],
      highestLevel: 23213,
      guildRank: 'Insomniac'
    },{
      uuid: 'bf4fba4359bb44ffb58f37c6b4940333',
      name: 'Rain_stxrm',
      experience: [23213, 4324, 13213, 5322],
      highestLevel: 23213,
      guildRank: 'Insomniac'
    },{
      uuid: 'bf4fba4359bb44ffb58f37c6b4940333',
      name: 'Rain_stxrm',
      experience: [23213, 4324, 13213, 5322],
      highestLevel: 23213,
      guildRank: 'Insomniac'
    },{
      uuid: 'bf4fba4359bb44ffb58f37c6b4940333',
      name: 'Rain_stxrm',
      experience: [23213, 4324, 13213, 5322],
      highestLevel: 23213,
      guildRank: 'Insomniac'
    },{
      uuid: 'bf4fba4359bb44ffb58f37c6b4940333',
      name: 'Rain_stxrm',
      experience: [23213, 4324, 13213, 5322],
      highestLevel: 23213,
      guildRank: 'Insomniac'
    },{
      uuid: 'bf4fba4359bb44ffb58f37c6b4940333',
      name: 'Rain_stxrm',
      experience: [23213, 4324, 13213, 5322],
      highestLevel: 23213,
      guildRank: 'Sleeper'
    },{
      uuid: 'bf4fba4359bb44ffb58f37c6b4940333',
      name: 'Rain_stxrm',
      experience: [23213, 4324, 13213, 5322],
      highestLevel: 23213,
      guildRank: 'Insomniac'
    },{
      uuid: 'bf4fba4359bb44ffb58f37c6b4940333',
      name: 'Rain_stxrm',
      experience: [23213, 4324, 13213, 5322],
      highestLevel: 23213,
      guildRank: 'Sleeper'
    },{
      uuid: 'bf4fba4359bb44ffb58f37c6b4940333',
      name: 'Rain_stxrm',
      experience: [23213, 4324, 13213, 5322],
      highestLevel: 23213,
      guildRank: 'Insomniac'
    }]
  }

   ngOnInit() {
    this.getData()
  }

  getData() {
    this.playerDataService.getGuild().subscribe(res => {
      this.data = res.guild['members']
      this.guildSize = res.guild['members'].length
      this.loadPlayers()
    })
  }

  loadPlayers() {
    console.log(this.data)
    for (const p of this.data) {
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
        })
      })
    }
  }

  checkRequirement(profiles: playerProfiles[], levelReq: number) {
    this.belowReq = []
    console.log(levelReq, 'levelReq')
    console.log('check req ran')
    for (let p of profiles) {
      console.log(p, 'profile')
      if (!(this.staffRoles.includes(p.guildRank))) {
        if (p.highestLevel < levelReq) {
          this.belowReq.push(p)
        }
      }
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

  copyKickCommand(name: string) {
    console.log('copy')
    copy(`/g kick ${name}`)
  }
}