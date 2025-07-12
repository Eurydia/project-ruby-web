import { HistoryRounded } from "@mui/icons-material";
import { Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC, memo, useCallback } from "react";

type Props = {
  label?: string;
  value: string;
  onChange: (v: string) => unknown;
  onReset: () => unknown;
};
export const NumbericInput: FC<Props> = memo(
  ({ onReset, onChange, value, label }) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    return (
      <Grid container>
        <Grid size={{ xs: 4 }}>
          <Typography>{label}</Typography>
        </Grid>
        <Grid size={{ xs: "grow" }}>
          <Stack direction="row">
            <TextField
              fullWidth
              type="number"
              inputMode="numeric"
              placeholder={label}
              value={value}
              onChange={handleChange}
              size="small"
            />
            <IconButton onClick={onReset}>
              <HistoryRounded />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }
);
