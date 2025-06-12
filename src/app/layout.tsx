// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Weather Now - Real-time Weather Information',
  description: 'Get real-time weather information for any city worldwide. View temperature, humidity, wind speed, UV index, and more with our modern weather application.',
  keywords: 'weather, weather app, real-time weather, weather forecast, temperature, humidity, wind speed, UV index, Colombo weather',
  authors: [{ name: 'Weather Now' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Weather Now - Real-time Weather Information',
    description: 'Get real-time weather information for any city worldwide with our modern weather application.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weather Now - Real-time Weather Information',
    description: 'Get real-time weather information for any city worldwide with our modern weather application.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}