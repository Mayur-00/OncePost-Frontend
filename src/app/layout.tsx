import type { Metadata } from "next";
import { Geist, Geist_Mono ,Ubuntu } from "next/font/google";
import "../styles/globals.css"
import { Toaster } from "sonner";
import { GoogleProvider } from "@/providers/GoogleProvider";


const ubuntuSans = Ubuntu({
  variable: "--font-ubuntu-sans",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: 'OncePost | Manage All Your Socials',
  description: 'The ultimate tool for cross-posting and managing social media content.',
  keywords: ['Social Media', 'Post', 'Automation', 'OncePost'],
  openGraph: {
    title: 'OncePost',
    description: 'Post once, reach everywhere.',
    url: 'https://oncepost.site',
    siteName: 'OncePost',
    images: [{ url: 'https://oncepost.site/logo.png' }],
    type: 'website',
  },
}

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
