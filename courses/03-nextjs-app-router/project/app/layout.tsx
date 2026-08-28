import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "./providers/StoreProvider";
import "./globals.css";

// Server Component
// nextImage: Image optimization is handled by Next.js.
// nextFont: Next.js font optimization.
// fontOptimization: Font is optimized by next/font.
// optimizedFont: The font is applied to the application layout.
// StoreProvider: Redux Provider makes the store available to Client Components.
// configureStore, useSelector, useDispatch
//generateMetadata

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js App Router Project",
  description: "Learn Next.js App Router through practical challenges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}