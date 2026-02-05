import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createGiftOpen = mutation({
  args: {
    rewardLabel: v.string(),
    accountNumber: v.string(),
  },
  handler: async (ctx, args) => {
    const createdAt = Date.now();

    const id = await ctx.db.insert("giftOpens", {
      rewardLabel: args.rewardLabel,
      accountNumber: args.accountNumber,
      createdAt,
    });

    return { id, createdAt };
  },
});

export const getGiftOpenCount = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("giftOpens").collect();
    return { count: all.length };
  },
});

export const getLatestGiftOpens = query({
  args: {
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("giftOpens")
      .withIndex("by_createdAt")
      .order("desc")
      .take(args.limit);
  },
});
