import { CardStateHistory } from "@/types/cards";
import { Grid, Paper } from "@mui/material";
import { FC, memo } from "react";
import { OutputGridItemMemo } from "./OutputGridItem";

type Props = {
  states: CardStateHistory[] | null;
};
export const OutputGrid: FC<Props> = (props) => {
  const { states } = props;

  return (
    <Paper
      variant="outlined"
      sx={{
        padding: 2,
      }}
    >
      <Grid
        container
        columns={4}
        spacing={1}
      >
        {new Array(16).fill(0).map((_, index) => {
          let order: number | null = null;
          let moves: number | undefined = undefined;
          if (states !== null) {
            order = states.findIndex(
              (hist) => hist.latestMove === index
            );
            if (order >= 0) {
              moves = states[order].moves;
            }
          }
          return (
            <Grid
              key={"output-grid" + index}
              size={1}
              sx={{
                aspectRatio: "1/1",
              }}
            >
              <OutputGridItemMemo
                order={order}
                moves={moves}
              />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export const OutputGridMemo = memo(
  OutputGrid,
  (prev, next) => {
    return Object.is(prev.states, next.states);
  }
);
