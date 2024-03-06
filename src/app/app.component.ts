import { Component } from '@angular/core';
import { PlayerComponent } from './player/player.component';
import { FormsModule } from '@angular/forms';
import { PromotionCheckerComponent } from './promotion-checker/promotion-checker.component';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlayerComponent, FormsModule, PromotionCheckerComponent, NgbAlert, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Skyblock Level Checker';
  route = '/'

  constructor(private router: Router) {
    router.events.subscribe(route => {
      if (route instanceof NavigationStart) {
        if (route.url === '/') {
          this.route = 'home'
        } else {
          this.route = route.url.split('/')[1]
        }
        console.log(this.route)
      }
    })
  }

}
