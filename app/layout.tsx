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
    description: "Browse Ghanaian cultural icons — Adinkra, national emblems and more. For React, for any other framework, or as plain SVG.",
    icons: "/logo.svg",
    keywords: ["ghicons", "react", "npm",
        "icons", "typescript", "package",
        "symbols", "ghanaian", "ghana",
        "adinkra", "svg", "icon library",
        "african", "cultural symbols"
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
