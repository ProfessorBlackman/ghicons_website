import type {Metadata} from "next";
import {Bricolage_Grotesque, Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "./components/theme-provider";
import MigrationBanner from "./components/migration-banner";
import React from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// Display face for headlines. Bricolage has a hand-cut irregularity that suits
// symbols carved into calabash stamps; Geist stays the UI and body face.
const bricolage = Bricolage_Grotesque({
    variable: "--font-display",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "ghicons",
    description: "Ghanaian symbols gathered in one place and standardised — Adinkra, currency, national emblems and more. For React, for any other framework, or as plain SVG.",
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
            className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}
        >
        <ThemeProvider>
            <MigrationBanner/>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
