import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Council Tax Band Checker | Am I Paying Too Much? | CouncilTaxFighter.co.uk",
  description: "Check if you're in the wrong council tax band. Free assessment. If wrong, we write your VOA appeal letter for £4.99. 400,000 UK homes overpaying.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        {children}
        <Script src="https://analytics.buyandscrap.com/script.js" data-website-id="20322df8-4f3c-4e45-94d1-4a74aa184118" strategy="afterInteractive" />
      </body>
    </html>
  );
}
