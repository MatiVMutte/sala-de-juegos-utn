export type Suit = 'DIAMANTES' | 'CORAZONES' | 'PICAS' | 'TREBOLES';

export interface Card {
  value: number;
  suit: Suit;
}

export type HigherLowerState = 'PLAYING' | 'GAME_OVER';

export interface HigherLowerResult {
  user_id: string;
  correct_answers: number;
  total_rounds: number;
}

export function buildDeck(): Card[] {
  const suits: Suit[] = ['DIAMANTES', 'CORAZONES', 'PICAS', 'TREBOLES'];
  const deck: Card[] = [];
  for (const suit of suits) {
    for (let v = 1; v <= 10; v++) {
      deck.push({ value: v, suit });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
}

export const SUIT_SYMBOLS: Record<Suit, string> = {
  DIAMANTES: '◆',
  CORAZONES: '♥',
  PICAS: '♠',
  TREBOLES: '♣'
};
