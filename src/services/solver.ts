const coordinateToPos = (row: number, col: number) => {
  return row * 4 + col;
};

export const getRowsWithMissingCell = (
  missingCount: number,
  state: Boolean[]
) => {
  const result: number[] = [];
  for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
    const missing: number[] = [];
    for (let colIndex = 0; colIndex < 4; colIndex++) {
      const pos = coordinateToPos(rowIndex, colIndex);
      if (!state[pos]) {
        missing.push(pos);
      }
    }
    if (missing.length === missingCount) {
      result.push(...missing);
    }
  }
  return result;
};

export const getColsWithMissingCell = (
  missingCount: number,
  state: Boolean[]
) => {
  const result: number[] = [];
  for (let colIndex = 0; colIndex < 4; colIndex++) {
    const missing: number[] = [];
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      const pos = coordinateToPos(rowIndex, colIndex);
      if (!state[pos]) {
        missing.push(pos);
      }
    }
    if (missing.length === missingCount) {
      result.push(...missing);
    }
  }
  return result;
};

export const getDiagonalWithMissingCell = (
  missingCount: number,
  states: boolean[]
) => {
  const result: number[] = [];
  let missing: number[] = [];
  for (let i = 3; i < 13; i += 3) {
    if (!states[i]) {
      missing.push(i);
    }
  }
  if (missing.length === missingCount) {
    result.push(...missing);
  }
  missing = [];

  for (let i = 0; i < 16; i += 5) {
    if (!states[i]) {
      missing.push(i);
    }
  }
  if (missing.length === missingCount) {
    result.push(...missing);
  }
  return result;
};
