import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  giftOpens: defineTable({
    rewardLabel: v.string(),
    amount: v.number(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
  gameState: defineTable({
    key: v.string(),
    playCount: v.number(),
    phrases: v.optional(v.array(v.string())),
    lastPhrase: v.optional(v.string()),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),
  galleryPhotos: defineTable({
    storageId: v.id("_storage"),
    caption: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
  whisperMessages: defineTable({
    text: v.string(),
    author: v.union(v.literal("anh"), v.literal("em")),
    createdAt: v.number(),
    expiresAt: v.number(),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_expiresAt", ["expiresAt"]),
  musicTracks: defineTable({
    storageId: v.id("_storage"),
    title: v.string(),
    artist: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
