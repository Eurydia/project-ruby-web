import { useGreedySolver } from "@/hooks/useGreedySolver";
import { CardState } from "@/types/cards";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
  PinRounded,
  RestoreRounded,
  SearchRounded,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import { InputGridMemo } from "../InputGrid";
import { OutputGridMemo } from "../OutputGrid";

export const ActivityCard: FC = memo(() => {
  const solver = useGreedySolver();

  const [wildstamps, setWildstamps] = useState("3");
  const [states, setStates] = useState(() => {
    const init = new Array<boolean>(16);
    init.fill(false);
    return init;
  });
  const [result, setResult] = useState<CardState | null>(null);

  const handleSolve = useCallback(
    (states: boolean[], wildstamps: string) => {
      const _wstamps = Number.parseInt(wildstamps);
      if (Number.isNaN(_wstamps)) {
        setResult(null);
        return;
      }
      const cardState: CardState = {
        history: [],
        moves: _wstamps,
        states,
      };
      const solved = solver(cardState);
      console.debug(solved);
      setResult(solved);
    },
    [solver]
  );

  return (
    <Paper
      variant="outlined"
      sx={{
        padding: 1,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Grid container columns={{ xs: 1, md: 2 }} spacing={1}>
        <Grid size={1}>
          <Toolbar disableGutters variant="dense" sx={{ gap: 1 }}>
            <TextField
              fullWidth
              type="number"
              inputMode="numeric"
              placeholder="Wildstamps"
              value={wildstamps}
              onChange={(e) => {
                setWildstamps(e.target.value);
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PinRounded />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <IconButton
              size="large"
              onClick={() => {
                setWildstamps((prev) => {
                  const p = parseInt(prev);
                  if (isNaN(p)) {
                    return "0";
                  }
                  return Math.min(p + 1, 3).toString();
                });
              }}
            >
              <KeyboardArrowUpRounded />
            </IconButton>
            <IconButton
              size="large"
              onClick={() => {
                setWildstamps((prev) => {
                  const p = parseInt(prev);
                  if (isNaN(p)) {
                    return "0";
                  }
                  return Math.max(p - 1, 0).toString();
                });
              }}
            >
              <KeyboardArrowDownRounded />
            </IconButton>
          </Toolbar>
          <Toolbar disableGutters variant="dense" sx={{ gap: 1 }}>
            <Button
              startIcon={<SearchRounded />}
              variant="contained"
              disableElevation
              onClick={() => handleSolve(states, wildstamps)}
            >
              Solve
            </Button>
            <Button
              disableElevation
              startIcon={<RestoreRounded />}
              variant="outlined"
              onClick={() => {
                setStates(new Array(16).fill(false));
                setWildstamps("3");
              }}
            >
              Reset
            </Button>
          </Toolbar>
          <InputGridMemo
            states={states}
            onChange={(index, value) => {
              setStates((prev) => {
                const next = [...prev];
                next[index] = value;
                return next;
              });
            }}
          />
        </Grid>
        <Grid size={1}>
          <Stack spacing={1}>
            <Toolbar
              sx={{
                borderColor: "divider",
                borderWidth: 1,
                borderStyle: "solid",
                gap: 2,
              }}
            >
              <Typography>
                {result === null
                  ? "Moves: ?"
                  : `Moves: ${result.history.length}`}
              </Typography>
              <Divider variant="middle" orientation="vertical" flexItem />
              <Typography>
                {result === null ? "Stamps: ?" : `Stamps: ${result.moves}`}
              </Typography>
            </Toolbar>
            <OutputGridMemo states={result === null ? null : result.history} />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
});
