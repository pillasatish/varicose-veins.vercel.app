import "./globals.css";

export const metadata = {
  title: "VenoScan - AI Varicose Vein Analysis",
  description: "Advanced AI-powered varicose vein detection and staging from leg images",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}