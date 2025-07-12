import { useExploreSellStrategy } from "@/hooks/useExploreSellStrategy";
import { sellStrategyDetailsSchema } from "@/types/market-place-explorer";
import { RestoreRounded } from "@mui/icons-material";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { FC, memo, useState } from "react";
import { NumbericInput } from "../input/numeric-input";

export const MarketplaceCalculator: FC = memo(() => {
  const { getBasicDetails } = useExploreSellStrategy();
  const [stat, setStat] = useState<ReturnType<typeof getBasicDetails> | null>(
    null
  );

  const { Field, Subscribe, resetField, reset, handleSubmit } = useForm({
    defaultValues: {
      quantity: "",
      sellOrder: {
        unitPrice: "",
        unitFee: "",
        listingFees: "",
      },
      buyOrder: { unitPrice: "", unitFee: "" },
    },
    canSubmitWhenInvalid: true,
    onSubmit: ({ value }) => {
      const r = sellStrategyDetailsSchema.safeParse(value);
      if (r.success) {
        setStat(getBasicDetails(r.data));
        return;
      }
      setStat(null);
      console.debug(r.error);
    },
  });

  return (
    <Paper variant="outlined" sx={{ padding: 1 }}>
      <Stack spacing={1}>
        <Field name="quantity">
          {({ state, handleChange }) => (
            <NumbericInput
              value={state.value}
              onChange={handleChange}
              label="Quantity"
              onReset={() => resetField("quantity")}
            />
          )}
        </Field>
        <Typography component="div" variant="h5">{`Sell order`}</Typography>
        <Field name="sellOrder.unitPrice">
          {({ state, handleChange }) => (
            <NumbericInput
              value={state.value}
              onChange={handleChange}
              label="Unit price"
              onReset={() => resetField("sellOrder.unitPrice")}
            />
          )}
        </Field>
        <Field name="sellOrder.unitFee">
          {({ state, handleChange }) => (
            <NumbericInput
              value={state.value}
              onChange={handleChange}
              label="Unit fee"
              onReset={() => resetField("sellOrder.unitFee")}
            />
          )}
        </Field>
        <Field name="sellOrder.listingFees">
          {({ state, handleChange }) => (
            <NumbericInput
              value={state.value}
              onChange={handleChange}
              label="Listing fees"
              onReset={() => resetField("sellOrder.listingFees")}
            />
          )}
        </Field>
        <Typography component="div" variant="h5">{`Buy order`}</Typography>
        <Field name="buyOrder.unitPrice">
          {({ state, handleChange }) => (
            <NumbericInput
              value={state.value}
              onChange={handleChange}
              label="Unit price"
              onReset={() => resetField("buyOrder.unitFee")}
            />
          )}
        </Field>
        <Field name="buyOrder.unitFee">
          {({ state, handleChange }) => (
            <NumbericInput
              value={state.value}
              onChange={handleChange}
              label="Unit fee"
              onReset={() => resetField("buyOrder.unitFee")}
            />
          )}
        </Field>
        <Toolbar variant="dense" disableGutters sx={{ gap: 1 }}>
          <Subscribe>
            <Button disableElevation variant="contained" onClick={handleSubmit}>
              {`Calculate`}
            </Button>
          </Subscribe>
          <Button
            startIcon={<RestoreRounded />}
            variant="outlined"
            disableElevation
            onClick={() => reset()}
          >
            {`reset`}
          </Button>
        </Toolbar>
        <Paper variant="outlined" sx={{ padding: 1 }}>
          {stat !== null && (
            <List dense disablePadding>
              <List
                dense
                disablePadding
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {`Sell order`}
                  </ListSubheader>
                }
              >
                <ListItem dense disablePadding>
                  <ListItemText
                    secondary={stat.sellOrderData.profitPerUnit}
                    primary="Profit per unit (unit price - unit fee)"
                  />
                </ListItem>
                <ListItem dense disablePadding>
                  <ListItemText
                    secondary={stat.sellOrderData.profit}
                    primary="Profit (profit per unit * qty)"
                  />
                </ListItem>
                <ListItem dense disablePadding>
                  <ListItemText
                    secondary={stat.sellOrderData.netProfit}
                    primary="Net profit (profit - listing fees)"
                  />
                </ListItem>
                <ListItem dense disablePadding>
                  <ListItemText
                    secondary={stat.sellOrderData.listingFeeBreakEvenQty}
                    primary="Break even qty (listing fee / profit per unit)"
                  />
                </ListItem>
                <ListItem dense disablePadding>
                  <ListItemText
                    secondary={stat.sellOrderData.listingFeeBreakEvenQtyPercent}
                    primary="Break even qty (%) (listing fee / qty)"
                  />
                </ListItem>
              </List>
              <List
                dense
                disablePadding
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {`Buy order`}
                  </ListSubheader>
                }
              >
                <ListItem dense disablePadding>
                  <ListItemText
                    secondary={stat.buyOrderData.profitPerUnit}
                    primary="Profit per unit (unit price - unit fee)"
                  />
                </ListItem>
                <ListItem dense disablePadding>
                  <ListItemText
                    secondary={stat.buyOrderData.netProfit}
                    primary="Net profit (profit - listing fees)"
                  />
                </ListItem>
              </List>
              <ListItem dense disablePadding>
                <ListItemText
                  secondary={stat.netProfitRatio}
                  primary="Net profit ratio (buy order net proft / sell order net profit)"
                />
              </ListItem>
              <ListItem dense disablePadding>
                <ListItemText
                  secondary={stat.netProftDiff}
                  primary="Net profit diff (abs(buy order net proft - sell order net profit))"
                />
              </ListItem>
            </List>
          )}
        </Paper>
      </Stack>
    </Paper>
  );
});
