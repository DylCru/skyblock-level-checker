import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdown, NgbDropdownModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { playerProfiles } from '../playerProfiles';
import copy from 'copy-to-clipboard';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-promotion-checker',
  standalone: true,
  imports: [NgbDropdownModule, FormsModule, NgbTooltip, NgFor],
  templateUrl: './promotion-checker.component.html',
  styleUrl: './promotion-checker.component.css'
})
export class PromotionCheckerComponent {
  choice: string = ''

  minLevel: number = 0
  maxLevel: number = 430

  skyblockPlayers: playerProfiles[] = []
  displayPlayers: playerProfiles[] = []
  promotionPlayers: playerProfiles[] = []

  staffRole: string[] = ['Staff', 'Guild Master']

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

  getRankLevel(rank: string) {
    switch (rank) {
      case 'Sleeper':
        return 1
      case 'Dreamer':
        return 2
      case 'Insomniac':
        return 3
      case 'Hypnos':
        return 4
      default:
        return 0
    }
  }

  checkPlayers() {
    console.log(this.minLevel, 'min')
    console.log(this.maxLevel, 'max')
    this.displayPlayers = []
    this.promotionPlayers = []
    for (let p of this.skyblockPlayers) {
      if (!(this.staffRole.includes(p.guildRank))) {
        console.log(p.highestLevel, p.name)
        if (p.highestLevel <= (this.maxLevel * 100) && p.highestLevel >= (this.minLevel * 100)) {
          if (p.guildRank !== this.choice) {
            if (this.getRankLevel(p.guildRank) < this.getRankLevel(this.choice)) {
              this.promotionPlayers.push(p)
            } else {
              this.displayPlayers.push(p)
            }
          } else {
            this.displayPlayers.push(p)
          }
        }
      }
    }
  }

  setMinMax(min: number, max: number) {
    this.minLevel = min
    this.maxLevel = max
  }

  setSelectedRank(rank: string) {
    this.choice = rank
  }

  copyPromoteCommand(name: string) {
    copy(`/g kick ${name}`)
  }

  reset() {
    this.displayPlayers = []
    this.promotionPlayers = []
    this.maxLevel = 430
    this.minLevel = 0
    this.choice = ''
  }
}
