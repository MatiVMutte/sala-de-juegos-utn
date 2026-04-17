import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '', 
        loadComponent: () => 
            import('./features/home/presentation/home-page/home-page').then(m => m.HomePage),
        title: 'Inicio'
    },
    { 
        path: 'hidden-goal-game', 
        loadComponent: () => 
            import('./features/hidden-goal-game/presentation/hidden-goal-game/hidden-goal-game').then(m => m.HiddenGoalGame),
        title: 'Hidden Goal Game'
    },
    { path: 'juegos', redirectTo: '' },
    { path: 'quien-soy', redirectTo: '' },
    { path: 'login', redirectTo: '' },
    { path: '**', redirectTo: '' },
];
