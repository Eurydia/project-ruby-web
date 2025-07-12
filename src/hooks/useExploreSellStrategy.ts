import { SellStrategyDetails } from "@/types/market-place-explorer";
import { useCallback } from "react";

export const useExploreSellStrategy = () => {
  const getBasicDetails = useCallback(
    ({ buyOrder, quantity, sellOrder }: SellStrategyDetails) => {
      const sellOrderData = (() => {
        const { listingFees, unitFee, unitPrice } = sellOrder;
        const profitPerUnit = unitPrice - unitFee;
        const profit = profitPerUnit * quantity;
        const netProfit = profit - listingFees;
        const listingFeeBreakEvenQty = listingFees / profitPerUnit;
        const listingFeeBreakEvenQtyPercent = listingFeeBreakEvenQty / quantity;
        return {
          profit,
          netProfit,
          profitPerUnit,
          listingFeeBreakEvenQty,
          listingFeeBreakEvenQtyPercent,
        };
      })();

      const buyOrderData = (() => {
        const { unitFee, unitPrice } = buyOrder;
        const profitPerUnit = unitPrice - unitFee;
        const netProfit = profitPerUnit * quantity;

        return { profitPerUnit, netProfit };
      })();

      return {
        sellOrderData,
        buyOrderData,
        netProfitRatio: buyOrderData.netProfit / sellOrderData.netProfit,
        netProftDiff: Math.abs(
          buyOrderData.netProfit - sellOrderData.netProfit
        ),
      };
    },
    []
  );

  return { getBasicDetails };
};
