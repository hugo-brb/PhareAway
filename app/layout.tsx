import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionWrapper from "@/lib/SessionWrapper";

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

const Gravitas = localFont({
  src: "./fonts/Gravitas.woff2",
  variable: "--font-gravitas",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PhareAway",
  description:
    "PhareAway est une application ludique mettant en valeur les phares de France.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="fr">
        <body
          className={`${Ouraboros.variable} ${Recursive.variable} ${Gravitas.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
