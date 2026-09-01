import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata = {
  title: "The Corner Store",
  description: "Everything you need, catalog-style.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} font-sans bg-evergreen text-ivory`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}