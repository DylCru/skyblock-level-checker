import { Routes } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PromotionCheckerComponent } from './promotion-checker/promotion-checker.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'requirements', component: PlayerComponent},
    {path: 'promotion', component: PromotionCheckerComponent}
];
