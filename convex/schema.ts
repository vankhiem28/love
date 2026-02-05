import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  giftOpens: defineTable({
    rewardLabel: v.string(),
    accountNumber: v.string(),
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
  musicTracks: defineTable({
    storageId: v.id("_storage"),
    title: v.string(),
    artist: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
