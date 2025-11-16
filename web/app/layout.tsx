import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import "./globals.css";
import StarryBackground from "@/components/StarryBackground";
import { DialogManager } from "@/lib/dialogManager";
import { ThemeProvider } from "next-themes";
import Query from "@/lib/providers/QueryClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Space Explorer",
  description: "Explore the wonders of the universe with an interactive site..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Query>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative min-h-screen min-w-screen overflow-hidden">
              <DialogManager>
                <StarryBackground />
                {children}
              </DialogManager>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </Query>
  );
}
