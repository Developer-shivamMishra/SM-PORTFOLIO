import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provder";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "./globals.css";

const nunito = localFont({
  src: "./fonts/Nunito/Nunito-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-nunito",
});

const thasadith = localFont({
  src: [
    {
      path: "./fonts/Thasadith/Thasadith-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Thasadith/Thasadith-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Thasadith/Thasadith-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Thasadith/Thasadith-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-thasadith",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shivamishra.com"),
  title: "Shivam Mishra",
  description: "Hey! I'm Shivam Mishra, Software Developer",
  keywords: [
    "Shivam Mishra",
    "Software Developer",
    "React Developer",
   
    "Node.js Developer",
    "MongoDB",
    "JavaScript",
    "Backend Developer",
    "Computer Science Student",
    "Web Developer",
    "Portfolio",
    "Freelancer",
    "Internship",
  ],
  authors: [
    {
      name: "Shivam Mishra",
      url: "https://github.com/Developer-shivamMishra",
    },
  ],
  creator: "Shivam Mishra",
  publisher: "Shivam Mishra",

  openGraph: {
    title: "Shivam Mishra Portfolio",
    description: "Shivam Mishra - Software Developer",
    url: "https://www.shivamishra.com",
    siteName: "Shivam Mishra",
    images: [
      {
        url: "https://www.shivamishra.com/og-image.jpg?v=2",
        width: 1200,
        height: 630,
        alt: "Shivam Mishra Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shivam Mishra Portfolio",
    description: "Shivam Mishra - Software Developer",
    images: ["https://www.shivamishra.com/og-image.jpg?v=2"],
    creator: "@shivamdev",
  },

  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} ${thasadith.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
