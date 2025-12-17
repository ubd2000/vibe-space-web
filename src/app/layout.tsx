import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google"; // Using generic names, will adjust if not available or use local fonts as fallback
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
    title: "Vibe Space",
    description: "Premium Digital Asset Marketplace for Creators & Fans",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased bg-background text-foreground`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
