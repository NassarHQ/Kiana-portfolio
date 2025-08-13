// app/fonts.ts
import {
  Noto_Sans_JP,
  Playwrite_AU_QLD,
  Gloria_Hallelujah,
  Baskervville_SC,
} from "next/font/google";

// Noto Sans JP: omit subsets; optionally turn off preload (big file)
export const notoJP = Noto_Sans_JP({
  weight: ["400", "700"],
  preload: false,
  variable: "--font-noto-jp",
  display: "swap",
});

// Playwrite AU QLD: NO `subsets` here; set weight
export const playwriteQLD = Playwrite_AU_QLD({
  weight: "variable",              // or: ["300","400"] etc
  variable: "--font-playwrite-qld",
  display: "swap",
});

// These two can keep subsets: ["latin"]
export const gloria = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gloria",
  display: "swap",
});

export const baskervvilleSC = Baskervville_SC({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-baskervville-sc",
  display: "swap",
});
