import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "./components/nav";
import Footer from './components/footer';
import { Prompt } from 'next/font/google';
// import "./globals.css";

const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'เว็บไซต์ของคุณ',
  description: 'เว็บไซต์ที่ใช้ฟอนต์ Prompt',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={`${prompt.className} ${geistSans.variable} ${geistMono.variable} d-flex flex-column min-vh-100`}>
        <Navigation />
        <main className="flex-grow-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
