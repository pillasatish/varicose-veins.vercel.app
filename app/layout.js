import { Geist } from '@vercel/geist/font/sans';
import { GeistMono } from '@vercel/geist/font/mono';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = GeistMono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VenoScan - AI Varicose Vein Analysis",
  description: "Advanced AI-powered varicose vein detection and staging from leg images",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}