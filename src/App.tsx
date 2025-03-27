import {
  PinRounded,
  RestoreRounded,
  SearchRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  createTheme,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
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
        <Grid
          container
          columns={{ xs: 1, md: 2 }}
          spacing={2}
        >
          <Grid size={1}>
            <Paper
              variant="outlined"
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <TextField
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
            </Paper>
          </Grid>
          <Grid size={1}>
            <Paper
              variant="outlined"
              sx={{
                padding: 2,
                display: "flex",
                gap: 1,
                flexDirection: "column",
              }}
            >
              <Toolbar
                sx={{
                  borderColor: theme.palette.divider,
                  borderWidth: 1,
                  borderStyle: "solid",
                  gap: 2,
                }}
              >
                <Typography>
                  Moves:{" "}
                  {result === null
                    ? "?"
                    : result.history.length}
                </Typography>
                <Divider
                  variant="middle"
                  orientation="vertical"
                  flexItem
                />
                <Typography>
                  Stamps:{" "}
                  {result === null ? "?" : result.moves}
                </Typography>
              </Toolbar>
              <OutputGridMemo
                states={
                  result === null ? null : result.history
                }
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
