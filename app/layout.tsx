import type {Metadata} from "next";
import {Bricolage_Grotesque, Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {openGraphFor} from "./lib/og";
import {SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL} from "./lib/site";
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
    // Absolute URLs for canonical tags, Open Graph and the sitemap. Without it
    // every `alternates.canonical` below would resolve against localhost.
    metadataBase: new URL(SITE_URL),
    // Pages set a bare title — "Docs", or an icon's name — and get the site name
    // appended here, so 106 icon pages do not each restate it.
    title: {
        default: SITE_TAGLINE,
        template: `%s — ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    icons: "/logo.svg",
    keywords: ["ghicons", "react", "npm",
        "icons", "typescript", "package",
        "symbols", "ghanaian", "ghana",
        "adinkra", "svg", "icon library",
        "african", "cultural symbols"
    ],
    alternates: {canonical: "/"},
    openGraph: openGraphFor({url: "/"}),
    // Card type only: title, description and image are resolved per page from
    // the metadata above, so each icon page tweets as itself.
    twitter: {
        card: "summary_large_image",
    },
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
