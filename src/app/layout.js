import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

export const metadata = {
  title: "Study Tracker",
  description: "Your daily productivity companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
