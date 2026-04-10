import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
});

export const metadata = {
    title: "Bua Lagbe Service UI",
    description: "The Digital Concierge for premium domestic services.",
};

export default function RootLayout({ children }) {
    
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "1234567890-mockclientid.apps.googleusercontent.com";

    return (
        <html
            lang="en"
            className={`${inter.variable} ${manrope.variable} h-full antialiased`}
        >
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
            </head>
            <body className="min-h-full flex flex-col font-sans bg-surface text-on-surface">
                <GoogleOAuthProvider clientId={clientId}>
                    <TopNav />
                    {children}
                    <BottomNav />
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}
