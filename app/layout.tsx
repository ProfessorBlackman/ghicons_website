import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "./components/theme-provider";
import React from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ghicons",
    description: "Browse and preview traditional Ghanaian icons for React",
    icons: "/logo.svg",
    keywords: ["ghicons", "react", "npm",
        "icons", "typescript", "package",
        "symbols", "ghanaian", "ghana"
    ],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProvider>{children}</ThemeProvider>
        </body>
        </html>
    );
}
