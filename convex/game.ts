import { v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";

const STATE_KEY = "main";
const MAX_PLAYS = 1;

const fetchState = async (ctx: QueryCtx) => {
  const existing = await ctx.db
    .query("gameState")
    .withIndex("by_key", (q) => q.eq("key", STATE_KEY))
    .unique();

  return existing ?? null;
};

const getOrCreateState = async (ctx: MutationCtx) => {
  const existing = await ctx.db
    .query("gameState")
    .withIndex("by_key", (q) => q.eq("key", STATE_KEY))
    .unique();

  if (existing) {
    return existing;
  }

  const now = Date.now();
  const id = await ctx.db.insert("gameState", {
    key: STATE_KEY,
    playCount: 0,
    phrases: [],
    updatedAt: now,
  });

  return {
    _id: id,
    key: STATE_KEY,
    playCount: 0,
    phrases: [],
    updatedAt: now,
  };
};

export const getState = query({
  args: {},
  handler: async (ctx) => {
    const state = await fetchState(ctx);
    return {
      playCount: state?.playCount ?? 0,
      phrases: state?.phrases ?? [],
    };
  },
});

export const incrementPlayCount = mutation({
  args: {},
  handler: async (ctx) => {
    const state = await getOrCreateState(ctx);

    if (state.playCount >= MAX_PLAYS) {
      return { locked: true, playCount: state.playCount };
    }

    const nextCount = state.playCount + 1;
    await ctx.db.patch(state._id, {
      playCount: nextCount,
      updatedAt: Date.now(),
    });

    return { locked: false, playCount: nextCount };
  },
});

export const submitPhrase = mutation({
  args: {
    phrase: v.string(),
  },
  handler: async (ctx, args) => {
    const state = await getOrCreateState(ctx);

    const nextPhrases = [...(state.phrases ?? []), args.phrase];

    await ctx.db.patch(state._id, {
      playCount: 0,
      phrases: nextPhrases,
      updatedAt: Date.now(),
    });

    return { ok: true };
  },
});
