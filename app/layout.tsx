import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Cover Editor",
  description:
    "Book Cover Editor is a simple web application that lets users select a book, upload a custom image, edit the title and author text on the cover, and download the final design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <h1 className="text-4xl font-bold text-center">Book Cover Editor</h1>
        <Navigation />
        <main className="flex flex-col justify-center items-center mt-20">{children}</main>
      </body>
    </html>
  );
}
