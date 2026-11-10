import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { MotionProvider } from "@/components/MotionProvider";
import { ScrollProgress } from "@/components/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harmony Academy | Master The Art Of Music",
  description:
    "Explore interactive music courses, live mentorship, and world-class production training designed for musicians at every stage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-black text-white selection:bg-teal-500/30 selection:text-teal-200`}
      >
        <MotionProvider>
          <ScrollProgress />
          <div className="relative w-full flex items-center justify-center">
            <Navbar />
          </div>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
