import { QuestionMarkRounded } from "@mui/icons-material";
import {
  alpha,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, Fragment, memo, useMemo } from "react";

type Props = {
  order: number | null;
  moves?: number;
};
export const InputGridItem: FC<Props> = (props) => {
  const { palette } = useTheme();
  const { order, moves } = props;
  const bgColor = useMemo(() => {
    return order === null || order < 0
      ? palette.action.disabled
      : palette.primary.main;
  }, [palette, order]);

  const bgColorContrast = useMemo(() => {
    return alpha(
      palette.getContrastText(palette.primary.main),
      0.8
    );
  }, [palette]);

  return (
    <Paper
      variant="outlined"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor,
        flexDirection: "column",
      }}
    >
      {order === null && (
        <QuestionMarkRounded htmlColor={bgColorContrast} />
      )}
      {order !== null && order >= 0 && (
        <Fragment>
          <Typography
            fontWeight={900}
            color={bgColorContrast}
          >
            {order + 1}
          </Typography>
          <Typography color={bgColorContrast}>
            {`(${moves}/3)`}
          </Typography>
        </Fragment>
      )}
    </Paper>
  );
};

export const OutputGridItemMemo = memo(
  InputGridItem,
  (prev, next) => {
    return (
      prev.moves === next.moves && prev.order === next.order
    );
  }
);
