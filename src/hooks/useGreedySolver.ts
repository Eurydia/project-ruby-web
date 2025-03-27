import { isCardDone, stampCard } from "@/services/card";
import {
  getColsWithMissingCell,
  getDiagonalWithMissingCell,
  getRowsWithMissingCell,
} from "@/services/solver";
import { CardState } from "@/types/cards";
import { useCallback } from "react";

const solver = (card: CardState) => {
  const queue: CardState[] = [card];
  let bestResult: CardState | null = null;

  while (queue.length > 0) {
    const currCard = queue.shift()!;
    if (currCard.moves === 0) {
      continue;
    }

    if (isCardDone(currCard)) {
      if (
        bestResult === null ||
        currCard.moves > bestResult.moves
      ) {
        bestResult = currCard;
      }

      if (bestResult.moves === 3) {
        break;
      }
    }

    const states = currCard.states;
    const moves = new Set(
      getRowsWithMissingCell(1, states)
    );
    getColsWithMissingCell(1, states).forEach((move) =>
      moves.add(move)
    );
    getDiagonalWithMissingCell(1, states).forEach((move) =>
      moves.add(move)
    );

    if (moves.size === 0) {
      getRowsWithMissingCell(2, states).forEach((move) =>
        moves.add(move)
      );
      getColsWithMissingCell(2, states).forEach((move) =>
        moves.add(move)
      );
      getDiagonalWithMissingCell(2, states).forEach(
        (move) => moves.add(move)
      );
    }

    for (const move of moves) {
      const nextCard = stampCard(currCard, move);
      if (nextCard === null) {
        continue;
      }
      queue.push(nextCard);
    }
  }

  return bestResult;
};

export const useGreedySolver = () => {
  return useCallback(solver, []);
};
