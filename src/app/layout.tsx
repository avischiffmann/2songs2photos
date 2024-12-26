import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2songs2photos",
  description: "Upload 2 songs and 2 photos to create a collage.",
  metadataBase: new URL("https://2songs2photos.com"),
  openGraph: {
    title: "2songs2photos",
    description: "Upload 2 songs and 2 photos to create a collage.",
    url: "https://2songs2photos.com",
    siteName: "2songs2photos",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2songs2photos",
    description: "Upload 2 songs and 2 photos to create a collage.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
