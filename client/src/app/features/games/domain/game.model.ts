export interface GameCardData {
  title: string;
  description: string;
  route?: string;
  icon: string;
}

export const GAMES_DATA: GameCardData[] = [
  {
    title: 'AHORCADO',
    description: 'Juego clásico de adivinar la palabra letra por letra. Control solo por botones.',
    route: '/juegos/ahorcado',
    icon: 'hangman'
  },
  {
    title: 'MAYOR O MENOR',
    description: 'Adivina si la siguiente carta será mayor o menor. Juego con mazo de cartas.',
    route: '/juegos/mayor-menor',
    icon: 'cards'
  },
  {
    title: 'HIDDEN GOAL',
    description: 'Encuentra la pelota y luego el arco usando el boost como guía.',
    route: '/juegos/hidden-goal-game',
    icon: 'goal'
  },
  {
    title: 'PREGUNTADOS',
    description: 'Trivia de conocimiento general con preguntas de una API externa.',
    route: '/juegos/preguntados',
    icon: 'trivia'
  }
];
