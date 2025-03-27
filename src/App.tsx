import {
  RestoreRounded,
  SearchRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  createTheme,
  Grid,
  Stack,
  TextField,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { brown } from "@mui/material/colors";
import { FC, useCallback, useState } from "react";
import { InputGridMemo } from "./components/InputGrid";
import { OutputGridMemo } from "./components/OutputGrid";
import { useGreedySolver } from "./hooks/useGreedySolver";
import { CardState } from "./types/cards";

const theme = createTheme({
  palette: {
    primary: { main: brown["A700"] },
  },
});

export const App: FC = () => {
  const solver = useGreedySolver();

  const [wildstamps, setWildstamps] = useState("3");
  const [states, setStates] = useState(() => {
    const init = new Array<boolean>(16);
    init.fill(false);
    return init;
  });
  const [result, setResult] = useState<CardState | null>(
    null
  );

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
    <ThemeProvider theme={theme}>
      <Box padding={4}>
        <Stack spacing={1}>
          <TextField
            type="number"
            inputMode="numeric"
            placeholder="Wildstamps"
            value={wildstamps}
            onChange={(e) => {
              setWildstamps(e.target.value);
            }}
          />
          <Toolbar
            disableGutters
            variant="dense"
            sx={{ gap: 1 }}
          >
            <Button
              startIcon={<SearchRounded />}
              variant="contained"
              disableElevation
              onClick={() =>
                handleSolve(states, wildstamps)
              }
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
          <Grid
            container
            columns={{ xs: 1, md: 2 }}
            spacing={2}
          >
            <Grid size={1}>
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
              <OutputGridMemo
                states={
                  result === null ? null : result.history
                }
              />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};
