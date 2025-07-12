import { Box, Stack } from "@mui/material";
import { FC } from "react";
import { ActivityCard } from "./components/form/activity-card";
import { MarketplaceCalculator } from "./components/form/marketplace-calculator";

export const App: FC = () => {
  return (
    <Box
      padding={2}
      sx={{
        backgroundColor: "primary.dark",
      }}
    >
      <Stack spacing={1}>
        <ActivityCard />
        <MarketplaceCalculator />
      </Stack>
    </Box>
  );
};
