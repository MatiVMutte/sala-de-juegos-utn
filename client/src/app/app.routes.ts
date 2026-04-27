import { Routes } from '@angular/router';

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
        title: 'Hidden Goal Game'
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
        title: 'Login'
    },
    { 
        path: 'registro', 
        loadComponent: () => 
            import('./features/auth/presentation/register-page/register-page').then(m => m.RegisterPage),
        title: 'Registro'
    },
    { path: '**', redirectTo: '' },
];

export const menuItems = [
    { label: 'INICIO', route: '/' },
    { label: 'JUEGOS', route: '/juegos' },
    { label: 'QUIÉN SOY', route: '/quien-soy' },
    { label: 'LOGIN', route: '/login' },
    { label: 'REGISTRO', route: '/registro' },
];