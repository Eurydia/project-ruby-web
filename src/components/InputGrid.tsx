import { Grid } from "@mui/material";
import { FC, memo, useCallback } from "react";
import { InputGridItemMemo } from "./InputGridItem";

type Props = {
  states: boolean[];
  onChange: (index: number, value: boolean) => void;
};
export const InputGrid: FC<Props> = (props) => {
  const { onChange, states } = props;
  const handleChange = useCallback(
    (index: number) => {
      onChange(index, !states[index]);
    },
    [onChange, states]
  );

  return (
    <Grid
      container
      columns={4}
      spacing={1}
    >
      {states.map((_, index) => (
        <Grid
          key={"input-grid" + index}
          size={1}
          sx={{ aspectRatio: "1/1" }}
        >
          <InputGridItemMemo
            selected={states[index]}
            onClick={() => handleChange(index)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export const InputGridMemo = memo(
  InputGrid,
  (prev, next) => {
    for (let i = 0; i < 16; i++) {
      if (prev.states[i] !== next.states[i]) {
        return false;
      }
    }
    return Object.is(prev.onChange, next.onChange);
  }
);
