import type { Metadata } from "next";
import { Geist, Geist_Mono ,Ubuntu } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { GoogleProvider } from "@/providers/GoogleProvider";


const ubuntuSans = Ubuntu({
  variable: "--font-ubuntu-sans",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "OncePost",
  description: "Transform Your Online Presence using - OncePost ",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body
        className={`${ubuntuSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
