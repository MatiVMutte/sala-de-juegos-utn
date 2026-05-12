import { Routes } from '@angular/router';
import { guestGuard } from './features/auth/domain/guest.guard';
import { authGuard } from './features/auth/domain/auth.guard';

export const routes: Routes = [
    { 
        path: '', 
        loadComponent: () => 
            import('./features/home/presentation/home-page/home-page').then(m => m.HomePage),
        title: 'Inicio'
    },
    { 
        path: 'juegos/hidden-goal-game', 
        loadComponent: () => 
            import('./features/games/hidden-goal-game/presentation/hidden-goal-game/hidden-goal-game').then(m => m.HiddenGoalGame),
        title: 'Hidden Goal Game',
        canActivate: [authGuard]
    },
    {
        path: 'juegos/ahorcado',
        loadComponent: () =>
            import('./features/games/hangman/presentation/hangman-page/hangman-page').then(m => m.HangmanPage),
        title: 'Ahorcado',
        canActivate: [authGuard]
    },
    {
        path: 'juegos/mayor-menor',
        loadComponent: () =>
            import('./features/games/higher-lower/presentation/higher-lower-page/higher-lower-page').then(m => m.HigherLowerPage),
        title: 'Mayor o Menor',
        canActivate: [authGuard]
    },
    {
        path: 'juegos/preguntados',
        loadComponent: () =>
            import('./features/games/trivia/presentation/trivia-page/trivia-page').then(m => m.TriviaPage),
        title: 'Preguntados',
        canActivate: [authGuard]
    },
    {
        path: 'resultados',
        loadComponent: () =>
            import('./features/results/presentation/results-page/results-page').then(m => m.ResultsPage),
        title: 'Resultados',
        canActivate: [authGuard]
    },
    { 
        path: 'juegos', 
        loadComponent: () => 
            import('./features/games-list/presentation/games-list-page/games-list-page').then(m => m.GamesListPage),
        title: 'Juegos'
    },
    { 
        path: 'quien-soy', 
        loadComponent: () => 
            import('./features/about-me/presentation/about-me-page/about-me-page').then(m => m.AboutMePage),
        title: 'Quién Soy'
    },
    { 
        path: 'login', 
        loadComponent: () => 
            import('./features/auth/presentation/login-page/login-page').then(m => m.LoginPage),
        title: 'Login',
        canActivate: [guestGuard]
    },
    { 
        path: 'registro', 
        loadComponent: () => 
            import('./features/auth/presentation/register-page/register-page').then(m => m.RegisterPage),
        title: 'Registro',
        canActivate: [guestGuard]
    },
    { path: '**', redirectTo: '' },
];

export const menuItems = [
    { label: 'INICIO', route: '/' },
    { label: 'JUEGOS', route: '/juegos' },
    { label: 'RESULTADOS', route: '/resultados' },
    { label: 'QUIÉN SOY', route: '/quien-soy' },
    { label: 'LOGIN', route: '/login' },
    { label: 'REGISTRO', route: '/registro' },
];