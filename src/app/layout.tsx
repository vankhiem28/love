import type { Metadata } from "next";
import {
  Dancing_Script,
  Playfair_Display,
  Source_Sans_3,
} from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./convex/ConvexClientProvider";
import { MusicPlayer } from "./components/MusicPlayer";
import { MUSIC_TRACKS } from "./content";

const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const letterFont = Dancing_Script({
  variable: "--font-letter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "A Love Letter",
  description: "A private, romantic page crafted with gentle animations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${letterFont.variable} antialiased`}
      >
        <ConvexClientProvider>
          {children}
          <MusicPlayer tracks={MUSIC_TRACKS} />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
