import z from "zod/v4";

export const sellStrategyDetailsSchema = z.object({
  quantity: z.coerce.number().nonnegative().default(0),
  sellOrder: z.object({
    unitPrice: z.coerce.number().nonnegative().default(0),
    unitFee: z.coerce.number().nonnegative().default(0),
    listingFees: z.coerce.number().nonnegative().default(0),
  }),
  buyOrder: z.object({
    unitPrice: z.coerce.number().nonnegative().default(0),
    unitFee: z.coerce.number().nonnegative().default(0),
  }),
});

export type SellStrategyDetails = z.infer<typeof sellStrategyDetailsSchema>;
