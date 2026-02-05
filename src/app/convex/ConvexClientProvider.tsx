"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_CONVEX_URL. Set it in .env.local from Convex dev."
  );
}

const convex = new ConvexReactClient(convexUrl);

type ConvexClientProviderProps = {
  children: ReactNode;
};

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => (
  <ConvexProvider client={convex}>{children}</ConvexProvider>
);
