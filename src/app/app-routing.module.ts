import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'navbar',
    loadChildren: () => import('./components/navbar/navbar.module').then( m => m.NavbarPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./components/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'card',
    loadChildren: () => import('./components/card/card.module').then( m => m.CardPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'ranking',
    loadChildren: () => import('./components/ranking/ranking.module').then( m => m.RankingPageModule)
  },
  {
    path: 'game-board',
    loadChildren: () => import('./components/game-board/game-board.module').then( m => m.GameBoardPageModule)
  },
  {
    path: 'player',
    loadChildren: () => import('./components/player/player.module').then( m => m.PlayerPageModule)
  },
  {
    path: 'pokemon-selection',
    loadChildren: () => import('./components/pokemon-selection/pokemon-selection.module').then( m => m.PokemonSelectionPageModule)
  },
  {
    path: 'computerplayer',
    loadChildren: () => import('./components/computerplayer/computerplayer.module').then( m => m.ComputerplayerPageModule)
  },
  {
    path: 'pokemon-gym',
    loadChildren: () => import('./components/pokemon-gym/pokemon-gym.module').then( m => m.PokemonGymPageModule)
  },
  {
    path: 'computer-player-card',
    loadChildren: () => import('./components/computer-player-card/computer-player-card.module').then( m => m.ComputerPlayerCardPageModule)
  },
  {
    path: 'battle-mechanics',
    loadChildren: () => import('./components/battle-mechanics/battle-mechanics.module').then( m => m.BattleMechanicsPageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./components/loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'score',
    loadChildren: () => import('./components/score/score.module').then( m => m.ScorePageModule)
  },
  {
    path: 'deck',
    loadChildren: () => import('./components/deck/deck.module').then( m => m.DeckPageModule)
  },
  {
    path: 'turn-time',
    loadChildren: () => import('./components/turn-time/turn-time.module').then( m => m.TurnTimePageModule)
  },
  {
    path: 'battle-result',
    loadChildren: () => import('./components/battle-result/battle-result.module').then( m => m.BattleResultPageModule)
  },
  {
    path: 'multiplayer',
    loadChildren: () => import('./components/online/multiplayer/multiplayer.module').then( m => m.MultiplayerPageModule)
  },
  {
    path: 'battle-room',
    loadChildren: () => import('./components/online/battle-room/battle-room.module').then( m => m.BattleRoomPageModule)
  },  {
    path: 'chat',
    loadChildren: () => import('./components/chat/chat.module').then( m => m.ChatPageModule)
  },


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
