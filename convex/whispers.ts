import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const EXPIRES_AFTER_MS = 24 * 60 * 60 * 1000;

const normalizeText = (value: string) => value.trim();

export const listActiveMessages = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const messages = await ctx.db
      .query("whisperMessages")
      .withIndex("by_expiresAt", (q) => q.gt("expiresAt", now))
      .order("desc")
      .take(120);

    return messages;
  },
});

export const createMessage = mutation({
  args: {
    text: v.string(),
    author: v.union(v.literal("anh"), v.literal("em")),
  },
  handler: async (ctx, args) => {
    const text = normalizeText(args.text);
    if (!text) {
      throw new Error("Text is required");
    }

    const createdAt = Date.now();
    const expiresAt = createdAt + EXPIRES_AFTER_MS;
    const id = await ctx.db.insert("whisperMessages", {
      text,
      author: args.author,
      createdAt,
      expiresAt,
    });

    return { id, createdAt };
  },
});
