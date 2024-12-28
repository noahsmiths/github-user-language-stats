import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitHub User Language Stats",
  description: "An app to create a similar language graphic available on each GitHub repo for an entire user's profile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
