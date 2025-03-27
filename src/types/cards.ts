export type CardState = {
  states: boolean[];
  moves: number;
  history: CardStateHistory[];
};

export type CardStateHistory = {
  moves: number;
  latestMove: number;
};
