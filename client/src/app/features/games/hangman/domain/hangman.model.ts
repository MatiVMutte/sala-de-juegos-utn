export const HANGMAN_WORDS: string[] = [
  'ANGULAR', 'TYPESCRIPT', 'COMPONENTE', 'SERVICIO', 'MODULO',
  'INTERFAZ', 'VARIABLE', 'FUNCION', 'PROGRAMA', 'ALGORITMO',
  'COMPUTADORA', 'INTERNET', 'NAVEGADOR', 'SERVIDOR', 'CLIENTE',
  'TECLADO', 'MONITOR', 'ARCHIVO', 'CARPETA', 'PROYECTO'
];

export type HangmanState = 'PLAYING' | 'WON' | 'LOST';

export const MAX_ERRORS = 6;

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export interface HangmanResult {
  user_id: string;
  word: string;
  letters_used: number;
  won: boolean;
  duration_seconds: number;
}
