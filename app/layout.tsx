import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ashwanths.in"),

  title: {
    default: "Ashwanth S - Developer and Innovator",
    template: "%s | Ashwanth S",
  },

  description:
    "Personal website of Ashwanth S, a passionate developer skilled in web development, game design, Flutter, AI, and multi-platform applications. Explore projects, achievements, and more.",

  keywords: [
    "Ashwanth S",
    "developer",
    "web developer",
    "game developer",
    "Flutter developer",
    "Next.js",
    "React",
    "Node.js",
    "Python",
    "Django",
    "AI",
    "portfolio",
    "full stack developer",
  ],

  authors: [{ name: "Ashwanth S", url: "https://ashwanths.in" }],
  creator: "Ashwanth S",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "Ashwanth S - Developer and Innovator",
    description:
      "Explore the portfolio of Ashwanth S — projects, achievements, and innovations in web, AI, and software development.",
    url: "https://ashwanths.in",
    siteName: "Ashwanth Portfolio",
    images: [
      {
        url: "/og-image.png", // put this in /public
        width: 1200,
        height: 630,
        alt: "Ashwanth S Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ashwanth S - Developer",
    description:
      "Portfolio of Ashwanth S — developer, innovator, and tech enthusiast.",
    images: ["/og-image.png"],
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
