import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const createTrack = mutation({
  args: {
    storageId: v.id("_storage"),
    title: v.string(),
    artist: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("musicTracks", {
      storageId: args.storageId,
      title: args.title,
      artist: args.artist,
      createdAt: Date.now(),
    });
  },
});

export const listTracks = query(async (ctx) => {
  const tracks = await ctx.db
    .query("musicTracks")
    .withIndex("by_createdAt")
    .order("desc")
    .collect();

  const resolved = await Promise.all(
    tracks.map(async (track) => {
      const url = await ctx.storage.getUrl(track.storageId);
      return url
        ? {
            _id: track._id,
            title: track.title,
            artist: track.artist,
            storageId: track.storageId,
            url,
            createdAt: track.createdAt,
          }
        : null;
    })
  );

  return resolved.filter((track) => track !== null);
});
