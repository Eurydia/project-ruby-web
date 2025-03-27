import { PanoramaFishEyeRounded } from "@mui/icons-material";
import {
  alpha,
  CardActionArea,
  Paper,
  styled,
  useTheme,
} from "@mui/material";
import { FC, memo, useMemo } from "react";

const StyledPaper = styled(Paper)({
  width: "100%",
  height: "100%",
});

const StyledCardActionArea = styled(CardActionArea)({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

type Props = {
  selected: boolean;
  onClick: () => void;
};
export const InputGridItem: FC<Props> = (props) => {
  const { palette } = useTheme();
  const { selected, onClick } = props;
  const bgColor = useMemo(() => {
    return selected ? palette.primary.main : undefined;
  }, [palette, selected]);

  const bgColorContrast = useMemo(() => {
    return alpha(
      palette.getContrastText(palette.primary.main),
      0.8
    );
  }, [palette]);

  return (
    <StyledPaper variant="outlined">
      <StyledCardActionArea
        onClick={onClick}
        sx={{
          backgroundColor: bgColor,
        }}
      >
        {selected && (
          <PanoramaFishEyeRounded
            htmlColor={bgColorContrast}
          />
        )}
      </StyledCardActionArea>
    </StyledPaper>
  );
};

export const InputGridItemMemo = memo(
  InputGridItem,
  (prev, next) => {
    return (
      prev.selected === next.selected &&
      Object.is(prev.onClick, next.onClick)
    );
  }
);
