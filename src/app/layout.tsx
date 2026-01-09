import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";
import { Toaster } from "react-hot-toast";
import ChatIcon from "./components/AIChatbot/ChatIcon";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Huzaifa | Portfolio",
  description: "Huzaifa: Web Developer & Next.js Frontend Specialist. View my portfolio of full-stack projects built with React, TypeScript, and Python. Currently exploring AI integration.",
  viewport: "width=device-width, initial-scale=1.0",

  verification: {
    google: "I9F04fEi5UdTqzPoLBV9yt92nCHnDlR5FZq8peTU6qk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-background text-foreground ${inter.className} dark antialiased`}
      >
        <ThemeToggle />
        <ChatIcon />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#000000",
              color: "#fff",
            },
          }}
        />
        {children}
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-X4W3CVE796"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-X4W3CVE796');
            `,
          }}
        />
      </body>
    </html>
  );
}
