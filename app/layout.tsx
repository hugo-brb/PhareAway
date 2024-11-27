import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const Ouraboros = localFont({
  src: "./fonts/Ouroboros.woff2",
  variable: "--font-ouroboros",
  weight: "100 900",
});

const Recursive = localFont({
  src: "./fonts/Recursive.woff2",
  variable: "--font-recursive",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PhareAway",
  description: "PhareAway est une application ludique mettant en valeur les phares de France.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${Ouraboros.variable} ${Recursive.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
