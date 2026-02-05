import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return ctx.storage.generateUploadUrl();
  },
});

export const createPhoto = mutation({
  args: {
    storageId: v.id("_storage"),
    caption: v.string(),
  },
  handler: async (ctx, args) => {
    const createdAt = Date.now();

    const id = await ctx.db.insert("galleryPhotos", {
      storageId: args.storageId,
      caption: args.caption,
      createdAt,
    });

    return { id, createdAt };
  },
});

export const listPhotos = query({
  args: {
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const photos = await ctx.db
      .query("galleryPhotos")
      .withIndex("by_createdAt")
      .order("desc")
      .take(args.limit);

    const urls = await Promise.all(
      photos.map((photo) => ctx.storage.getUrl(photo.storageId))
    );

    return photos.map((photo, index) => ({
      ...photo,
      url: urls[index],
    }));
  },
});
