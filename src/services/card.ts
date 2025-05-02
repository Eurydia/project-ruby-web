import { CardState, CardStateHistory } from "@/types/cards";

const CARD_FINAL_STATE_ID = 65535;

export const getCardStateId = (card: CardState) => {
  let stateIdBinRepr = "";
  for (const state of card.states) {
    stateIdBinRepr += state ? "1" : "0";
  }

  return Number.parseInt(stateIdBinRepr, 2);
};

export const isCardDone = (card: CardState) => {
  return getCardStateId(card) === CARD_FINAL_STATE_ID;
};

const posToRow = (pos: number) => {
  return Math.floor(pos / 4) * 4;
};

const posToCol = (pos: number) => {
  return pos % 4;
};

const isRowDone = (pos: number, states: boolean[]) => {
  const row = posToRow(pos);
  for (let i = row; i < row + 4; i++) {
    if (!states[i]) {
      return false;
    }
  }
  return true;
};

const isColDone = (pos: number, states: boolean[]) => {
  const col = posToCol(pos);
  for (let i = col; i < 16; i += 4) {
    if (!states[i]) {
      return false;
    }
  }
  return true;
};

const isDiagonalFiveDone = (states: boolean[]) => {
  for (let i = 0; i < 16; i += 5) {
    if (!states[i]) {
      return false;
    }
  }
  return true;
};

const isDiagonalThreeDone = (states: boolean[]) => {
  for (let i = 3; i < 13; i += 3) {
    if (!states[i]) {
      return false;
    }
  }
  return true;
};

export const stampCard = (card: CardState, pos: number) => {
  if (card.moves === 0) {
    return null;
  }
  if (card.states[pos]) {
    return null;
  }

  const nextStates = [...card.states];
  nextStates[pos] = true;

  let nextMoves = card.moves - 1;
  if (
    isColDone(pos, nextStates) &&
    !isColDone(pos, card.states)
  ) {
    nextMoves++;
  }
  if (
    isRowDone(pos, nextStates) &&
    !isRowDone(pos, card.states)
  ) {
    nextMoves++;
  }
  if (
    pos % 5 === 0 &&
    isDiagonalFiveDone(nextStates) &&
    !isDiagonalFiveDone(card.states)
  ) {
    nextMoves++;
  }
  if (
    pos % 3 === 0 &&
    pos > 0 &&
    isDiagonalThreeDone(nextStates) &&
    !isDiagonalThreeDone(card.states)
  ) {
    nextMoves++;
  }
  nextMoves = Math.min(nextMoves, 3);

  const nextHistory: CardStateHistory[] = [
    ...card.history,
    {
      latestMove: pos,
      moves: nextMoves,
    },
  ];

  const nextCardState: CardState = {
    history: nextHistory,
    moves: nextMoves,
    states: nextStates,
  };
  return nextCardState;
};
